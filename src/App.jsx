import React from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "./App.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import Main from "./components/Main.jsx";

function App() {
  //  Used to connect to Devnet
  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = React.useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);

  // Initialising wallets for use
  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    [solNetwork]
  );

  return (
    <>
      <ConnectionProvider endpoint={endpoint} />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <div className="App">{<Main />}</div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
