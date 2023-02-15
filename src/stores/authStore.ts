import { WalletInfo, isWalletInfoInjected } from "@tonconnect/sdk";
import create from "zustand";

type WalletsListState =
  | { state: "loading" }
  | {
      state: "done";
      contents: { walletsList: WalletInfo[]; embeddedWallet?: WalletInfo };
    };
type AuthPayloadState =
  | { state: "loading" }
  | { state: "done"; contents: { tonProofPayload: string } };

type AuthStoreState = {
  walletsList: WalletsListState;
  authPayload: AuthPayloadState;
};

type AuthStoreActions = {
  setWalletsList: (
    walletsList: WalletInfo[],
    embeddedWallet?: WalletInfo
  ) => void;
  setAuthPayload: (payload: { tonProofPayload: string }) => void;
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>(
  (set) => ({
    walletsList: { state: "loading" },
    authPayload: { state: "loading" },
    setAuthPayload: (payload) =>
      set({ authPayload: { state: "done", contents: payload } }),
    setWalletsList: (walletsList, embeddedWallet) =>
      set({
        walletsList: {
          state: "done",
          contents: { walletsList, embeddedWallet },
        },
      }),
  })
);
