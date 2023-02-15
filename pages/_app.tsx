import ConnectorContext from "@/src/components/ConnectorContext";
import { ConnectorProvider } from "@/src/providers/ConnectorProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConnectorProvider>
      <Component {...pageProps} />
    </ConnectorProvider>
  );
}
