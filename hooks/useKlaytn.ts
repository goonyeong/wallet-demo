import { useState, useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

const WALLET = "KAIKAS";

export const useKlaytn = (setWalletInfo: (address: string, wallet: TWALLET) => void) => {
  const [klaytnProvider, setKlaytnProvider] = useState<any | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (klaytnProvider) {
      const accountArr = await klaytnProvider.enable();
      if (Array.isArray(accountArr) && accountArr.length > 0) setWalletInfo(accountArr[0], WALLET);
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
          setWalletInfo(accountArr[0], WALLET);
        }
      });
    };

    if (klaytnProvider) {
      onAccountChange();
    }
  }, [klaytnProvider, setWalletInfo]);

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
