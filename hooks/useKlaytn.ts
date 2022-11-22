import { useState, useEffect } from "react";

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

  // AccountChange
  const onAccountChange = (onChange: (address: string, wallet: TWALLET) => void) => {
    klaytnProvider?.on("accountsChanged", (accountArr: Array<any> | unknown) => {
      if (Array.isArray(accountArr)) {
        onChange(accountArr[0], WALLET);
      }
    });
  };

  // Disconnect
  const onDisconnect = (disconnect: () => void) => {
    klaytnProvider?.on("disconnected", disconnect);
  };

  // Initialize Klaytn provider state
  useEffect(() => {
    const getProvider = () => {
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
    klaytnProvider,
    isWalletInstall,
    connectWallet,
    getAddress,
    onAccountChange,
    onDisconnect,
  };
};
