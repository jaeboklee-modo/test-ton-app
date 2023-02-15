import { useEffect, useState, useContext } from "react";
import { Wallet } from "@tonconnect/sdk";
import ConnectorContext from "../components/ConnectorContext";

export function useTonWallet() {
  const connector = useContext(ConnectorContext);
  if (!connector) {
    throw Error();
  }
  const [wallet, setWallet] = useState<Wallet | null>(connector.wallet);

  useEffect(
    () => connector.onStatusChange(setWallet, console.error),
    [connector]
  );

  return wallet;
}
