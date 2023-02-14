import { UserRejectsError } from "@tonconnect/sdk";
import { useCallback, useEffect } from "react";
import { connector } from "../services/Connector";

export function useTonWalletConnectionError(callback: () => void) {
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
    [emptyCallback, errorsHandler]
  );
}