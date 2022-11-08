import { useState, useEffect } from "react";
import { IPhantomProvider } from "types/interface";

export const useSolana = () => {
  const [solanaProvider, setSolanaProvider] = useState<IPhantomProvider | undefined>(undefined);
  const [isPhantom, setIsPhantom] = useState(false);

  // Connect wallet
  const connectWallet = async (): Promise<string> => {
    if (solanaProvider) {
      const { publicKey } = await solanaProvider.connect();
      return publicKey.toString();
    }
    return "";
  };

  // Disconnect wallet
  const disconnectWallet = async (walletAddress: string) => {
    if (solanaProvider && walletAddress) {
      await solanaProvider.disconnect();
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

  // Initialize provider state
  useEffect(() => {
    const getProvider = (): IPhantomProvider | undefined => {
      if ("solana" in window) {
        // @ts-ignore
        const provider = window.solana as any;
        if (provider.isPhantom) {
          setIsPhantom(true);
          return provider as IPhantomProvider;
        }
      }
    };
    const provider = getProvider();
    if (provider) setSolanaProvider(provider);
  }, []);

  return { connectWallet, disconnectWallet, isPhantom, getAddress };
};
