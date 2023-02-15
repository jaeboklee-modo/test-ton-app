import { DownOutlined } from "@ant-design/icons";
import { isWalletInfoInjected, WalletInfoRemote } from "@tonconnect/sdk";
import { Button, Dropdown, Menu, Modal, notification, Space } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useTonWallet } from "src/hooks/useTonWallet";
import { useTonWalletConnectionError } from "src/hooks/useTonWalletConnectionError";
import { useFriendlyAddress } from "../hooks/useFriendlyAddress";
import { addReturnStrategy } from "../services/Connector";
import { useAuthStore } from "../stores/authStore";
import { isMobile, openLink } from "@/utils/window";
import ConnectorContext from "./ConnectorContext";
import useTonProofDemoApi from "../hooks/useTonProofApi";

export function AuthButton() {
  const [modalUniversalLink, setModalUniversalLink] = useState("");
  const connector = useContext(ConnectorContext);
  // TODO Fix it
  // const tonProof = useTonProofDemoApi();

  const wallet = useTonWallet();

  const onConnectErrorCallback = useCallback(() => {
    setModalUniversalLink("");
    notification.error({
      message: "Connection was rejected",
      description: "Please approve connection to the dApp in your wallet.",
    });
  }, []);
  useTonWalletConnectionError(onConnectErrorCallback);

  const { walletsList, authPayload, setAuthPayload, setWalletsList } =
    useAuthStore();
  const address = useFriendlyAddress(wallet?.account.address);

  useEffect(() => {
    if (modalUniversalLink && wallet) {
      setModalUniversalLink("");
    }
  }, [modalUniversalLink, wallet]);

  const handleButtonClick = useCallback(async () => {
    if (walletsList.state === "loading" || authPayload.state === "loading") {
      // You can show a loading indicator here.
      return;
    }

    if (walletsList.contents.embeddedWallet && connector) {
      connector.connect(
        { jsBridgeKey: walletsList.contents.embeddedWallet.aboutUrl },
        { tonProof: authPayload.contents.tonProofPayload }
      );
      return;
    }

    if (isMobile()) {
      openLink(addReturnStrategy("universalLink", "none"), "_blank");
    } else {
      setModalUniversalLink("universalLink");
    }
  }, [walletsList, authPayload]);

  useEffect(() => {
    const fetchAuthPayload = async () => {
      // TODO
      // const payload = await tonProof.generatePayload();
      const payload = "temp";
      setAuthPayload({ tonProofPayload: payload });
    };
    fetchAuthPayload();
  }, [setAuthPayload]);

  useEffect(() => {
    if (connector) {
      const fetchWalletsList = async () => {
        const walletsList = await connector.getWallets();
        const embeddedWallet = walletsList
          .filter(isWalletInfoInjected)
          .find((wallet) => wallet.embedded);
        setWalletsList(walletsList, embeddedWallet);
      };
      fetchWalletsList();
    }
  }, [setWalletsList]);

  if (!connector) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="auth-button">
        {wallet ? (
          <Dropdown
            overlay={
              <Menu
                onClick={() => connector.disconnect()}
                items={[
                  {
                    label: "Disconnect",
                    key: "1",
                  },
                ]}
              />
            }
          >
            <Button shape="round" type="primary">
              <Space>
                {address}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Button shape="round" type="primary" onClick={handleButtonClick}>
            {walletsList.state === "loading" ? "Loading..." : "Connect Wallet"}
          </Button>
        )}
      </div>
      <Modal
        title="Connect to Tonkeeper"
        open={!!modalUniversalLink}
        onOk={() => setModalUniversalLink("")}
        onCancel={() => setModalUniversalLink("")}
      >
        <QRCode
          size={256}
          style={{ height: "260px", maxWidth: "100%", width: "100%" }}
          value={modalUniversalLink}
          viewBox={`0 0 256 256`}
        />
      </Modal>
    </>
  );
}
