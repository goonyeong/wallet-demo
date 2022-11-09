import { useState, useEffect } from "react";
import { IPhantomProvider } from "types/interface";
import { PublicKey } from "@solana/web3.js";

export const useSolana = (setAddress: (address: string) => void) => {
  const [solanaProvider, setSolanaProvider] = useState<IPhantomProvider | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (solanaProvider) {
      const { publicKey } = await solanaProvider.connect();
      setAddress(publicKey.toString());
    }
  };

  // Disconnect wallet
  const disconnectWallet = async (walletAddress: string) => {
    if (solanaProvider && walletAddress) {
      await solanaProvider.disconnect();
      setAddress("");
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
        setAddress(publicKey.toString());
      });
    };
    // Connect
    const onConnect = () => {
      solanaProvider?.on("connect", (publicKey: PublicKey) => {
        setAddress(publicKey.toString());
      });
    };
    // Disconnect
    const onDisconnect = () => {
      solanaProvider?.on("disconnect", (publicKey: PublicKey) => {
        setAddress("");
      });
    };

    if (solanaProvider) {
      onAccountChange();
      onConnect();
      onDisconnect();
    }
  }, [solanaProvider]);

  // Initialize solana provider state
  useEffect(() => {
    const getProvider = (): IPhantomProvider | undefined => {
      if ("solana" in window) {
        // @ts-ignore
        const provider = window.solana as any;
        if (provider.isPhantom) {
          setIsConnected(true);
          return provider as IPhantomProvider;
        }
      }
    };
    const provider = getProvider();
    if (provider) setSolanaProvider(provider);
  }, []);

  return {
    isConnected,
    connectWallet,
    disconnectWallet,
    getAddress,
  };
};
