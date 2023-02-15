import { TonProofItemReplySuccess } from "@tonconnect/protocol";
import { Account, TonConnect } from "@tonconnect/sdk";
import { useContext } from "react";
import "../../patch-local-storage-for-github-pages";
import ConnectorContext from "../components/ConnectorContext";

class TonProofDemoApiService {
  localStorageKey = "demo-api-access-token";

  host = "https://demo.tonconnect.dev";

  accessToken: string | null = null;

  connector: TonConnect;

  constructor(connector: TonConnect) {
    this.connector = connector;
    this.accessToken = localStorage.getItem(this.localStorageKey);

    this.connector.onStatusChange((wallet) => {
      if (!wallet) {
        this.reset();
        return;
      }

      const tonProof = wallet.connectItems?.tonProof;

      if (tonProof) {
        if ("proof" in tonProof) {
          this.checkProof(tonProof.proof, wallet.account);
          return;
        }

        console.error(tonProof.error);
      }

      if (!this.accessToken) {
        this.connector.disconnect();
      }
    });
  }

  async generatePayload() {
    const response = await (
      await fetch(`${this.host}/ton-proof/generatePayload`, {
        method: "POST",
      })
    ).json();

    return response.payload as string;
  }

  async checkProof(proof: TonProofItemReplySuccess["proof"], account: Account) {
    try {
      const reqBody = {
        address: account.address,
        network: account.chain,
        proof: {
          ...proof,
          state_init: account.walletStateInit,
        },
      };

      const response = await (
        await fetch(`${this.host}/ton-proof/checkProof`, {
          method: "POST",
          body: JSON.stringify(reqBody),
        })
      ).json();

      if (response?.token) {
        localStorage.setItem(this.localStorageKey, response.token);
        this.accessToken = response.token;
      }
    } catch (e) {
      console.log("checkProof error:", e);
    }
  }

  async getAccountInfo(account: Account) {
    const response = await (
      await fetch(`${this.host}/dapp/getAccountInfo?network=${account.chain}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return response as {};
  }

  reset() {
    this.accessToken = null;
    localStorage.removeItem(this.localStorageKey);
  }
}

function useTonProofDemoApi() {
  const connector = useContext(ConnectorContext);
  console.log("Connector is not initialized", connector);

  if (!connector) {
    throw Error();
  }

  return new TonProofDemoApiService(connector);
}

export default useTonProofDemoApi;
