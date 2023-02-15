import TonConnect from "@tonconnect/sdk";
import { createContext } from "react";

const ConnectorContext = createContext<TonConnect | undefined>(undefined);

export default ConnectorContext;
