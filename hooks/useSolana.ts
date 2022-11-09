import { useState, useEffect } from "react";
import { IPhantomProvider } from "types/interfaceWallet";
import { PublicKey } from "@solana/web3.js";

const WALLET = "PHANTOM";

export const useSolana = (setWalletInfo: (address: string, wallet: TWALLET) => void) => {
  const [solanaProvider, setSolanaProvider] = useState<IPhantomProvider | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (solanaProvider) {
      const { publicKey } = await solanaProvider.connect();
      setWalletInfo(publicKey.toString(), WALLET);
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

  // connect, unconnect, change -> wallet address update
  useEffect(() => {
    // AccountChange
    const onAccountChange = () => {
      solanaProvider?.on("accountChanged", (publicKey: PublicKey) => {
        console.log("account changed:: ", publicKey.toString());
        setWalletInfo(publicKey.toString(), WALLET);
      });
    };
    // Connect
    const onConnect = () => {
      solanaProvider?.on("connect", (publicKey: PublicKey) => {
        setWalletInfo(publicKey.toString(), WALLET);
      });
    };
    // Disconnect
    const onDisconnect = () => {
      solanaProvider?.on("disconnect", () => {
        console.log("phantom disconnected");
        setWalletInfo("", "");
      });
    };

    if (solanaProvider) {
      onAccountChange();
      onConnect();
      onDisconnect();
    }
  }, [solanaProvider, setWalletInfo]);

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
    isWalletInstall,
    connectWallet,
    getAddress,
  };
};
