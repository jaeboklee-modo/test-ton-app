import { UserRejectsError } from "@tonconnect/sdk";
import { useCallback, useEffect, useContext } from "react";
import ConnectorContext from "../components/ConnectorContext";

export function useTonWalletConnectionError(callback: () => void) {
  const connector = useContext(ConnectorContext);

  if (!connector) {
    throw Error();
  }

  const errorsHandler = useCallback(
    (error: unknown) => {
      if (typeof error === "object" && error instanceof UserRejectsError) {
        callback();
      }
    },
    [callback]
  );

  const emptyCallback = useCallback(() => {}, []);

  useEffect(
    () => connector.onStatusChange(emptyCallback, errorsHandler),
    [connector, emptyCallback, errorsHandler]
  );
}
