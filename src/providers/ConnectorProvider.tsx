import TonConnect from "@tonconnect/sdk";

import ConnectorContext from "../components/ConnectorContext";
import { useEffect, useState } from "react";

export const ConnectorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connector, setConnector] = useState<TonConnect | undefined>();

  useEffect(() => {
    const dappMetadata = {
      manifestUrl:
        "https://ton-connect.github.io/demo-dapp-with-backend/tonconnect-manifest.json",
    };
    const connector = new TonConnect(dappMetadata);

    setConnector(connector);
  }, []);

  // https://github.com/jaeboklee-modo/test-ton-app/blob/master/tonconnect-manifest.json

  if (connector === undefined) {
    // Return a loading state if the connector is undefined
    return <div>Loading...</div>;
  }

  return (
    <ConnectorContext.Provider value={connector}>
      {children}
    </ConnectorContext.Provider>
  );
};
