import { useState, useEffect } from "react";
import { IPhantomProvider } from "types/interface";
import { PublicKey } from "@solana/web3.js";
import { MetaMaskInpageProvider } from "@metamask/providers";

export const useKlaytn = (setAddress: (address: string) => void) => {
  const [klaytnProvider, setKlaytnProvider] = useState<any | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (klaytnProvider) {
      const accountArr = await klaytnProvider.enable();
      if (Array.isArray(accountArr) && accountArr.length > 0) setAddress(accountArr[0]);
    }
  };

  // Get address
  const getAddress = (): string => {
    if (klaytnProvider?.selectedAddress) {
      const address = klaytnProvider.selectedAddress;
      return address;
    }
    return "";
  };

  // connect, unconnect, change -> wallet address update
  useEffect(() => {
    // AccountChange
    const onAccountChange = () => {
      klaytnProvider?.on("accountsChanged", (accountArr: Array<any> | unknown) => {
        if (Array.isArray(accountArr)) {
          setAddress(accountArr[0]);
        }
      });
    };

    if (klaytnProvider) {
      onAccountChange();
    }
  }, [klaytnProvider]);

  // Initialize Klaytn provider state
  useEffect(() => {
    const getProvider = (): MetaMaskInpageProvider | undefined => {
      const provider = window.klaytn;
      if (provider?.isKaikas) {
        setIsWalletInstall(true);
        return provider;
      }
    };
    const provider = getProvider();
    if (provider) setKlaytnProvider(provider);
  }, []);

  return {
    isWalletInstall,
    connectWallet,
    getAddress,
  };
};
