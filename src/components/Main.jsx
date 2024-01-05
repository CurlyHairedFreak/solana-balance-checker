import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";

const Main = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = React.useState("");
  const [solPrice, setSolPrice] = React.useState("");

  // Api call
  const apiUrl =
    "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&precision=2";

  //  Function that retrieves SOL/USD price by calling Coingecko api
  const getSolPrice = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSolPrice(data.solana.usd);
    } catch (error) {
      // console.log(`Failed to fetch price of Solana: ${error.message}`);
    }
  };

  //  function that retrieves Balance of SOl in wallet
  const fetchBalance = async () => {
    if (!publicKey) return;
    const solBalance = await connection.getBalance(publicKey);
    // await getSolPrice();
    await setBalance(solBalance);
  };

  // Runs fetchBalance function if wallet is connected
  React.useEffect(() => {
    if (connected) {
      fetchBalance();
    }
    setBalance("");
  }, [publicKey, connection]);

  //  Runs getSolPrice function on initial render and when the wallet is changed
  React.useEffect(() => {
    getSolPrice();
  }, [publicKey]);

  return (
    <div>
      <p>SOL / USD: {solPrice ? solPrice : "0"}</p>
      <div className="main--walletInfo">
        <p className="main--sol--amount">
          <img
            src="/assets/solana-sol-logo.png"
            alt="Solana-logo"
            className="main--img"
          />
          in wallet: {balance ? balance / LAMPORTS_PER_SOL : "0"}
        </p>

        <p>
          which equals ${((balance / LAMPORTS_PER_SOL) * solPrice).toFixed(2)}
        </p>
      </div>
      {balance === null && <p>Error connecting or retrieving wallet balance</p>}
      {!connected && <WalletMultiButton />}
      <div className="btn--disconnect">
        {connected && <WalletDisconnectButton />}
      </div>
    </div>
  );
};

export default Main;
