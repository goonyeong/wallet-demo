import { useState, useEffect } from "react";
import { IPhantomProvider } from "types/interfaceWallet";
import { PublicKey } from "@solana/web3.js";

const WALLET = "PHANTOM";

const useSolana = (
  setWalletInfo: (address: string, wallet: TWALLET, network: TNETWORK) => void
) => {
  const [solanaProvider, setSolanaProvider] = useState<IPhantomProvider | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (solanaProvider) {
      const { publicKey } = await solanaProvider.connect();
      console.log("connect!");
      setWalletInfo(publicKey.toString(), WALLET, "SOLANA");
    }
  };

  // Get address
  const getAddress = (): string => {
    if (solanaProvider?.publicKey) {
      const address = solanaProvider.publicKey;
      return address.toString();
    }
    return "";
  };

  // AccountChange
  const onAccountChange = (
    onChange: (address: string, wallet: TWALLET, network: TNETWORK) => void
  ) => {
    solanaProvider?.on("accountChanged", (publicKey: PublicKey) => {
      if (publicKey) {
        onChange(publicKey.toString(), WALLET, "SOLANA");
      } else {
        connectWallet();
      }
    });
  };

  // // Disconnect
  // const onDisconnect = (disconnect: () => void) => {
  //   solanaProvider?.on("disconnect", disconnect);
  // };

  // Initialize solana provider state
  useEffect(() => {
    const getProvider = (): IPhantomProvider | undefined => {
      if ("solana" in window) {
        // @ts-ignore
        const provider = window.solana as any;
        if (provider.isPhantom) {
          setIsWalletInstall(true);
          return provider as IPhantomProvider;
        }
      }
    };
    const provider = getProvider();
    if (provider) setSolanaProvider(provider);
  }, []);

  return {
    solanaProvider,
    isWalletInstall,
    connectWallet,
    getAddress,
    onAccountChange,
  };
};

export default useSolana;
