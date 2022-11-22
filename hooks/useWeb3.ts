import { useState, useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

const WALLET = "METAMASK";

export const useWeb3 = (setWalletInfo: (address: string, wallet: TWALLET) => void) => {
  const [web3Provider, setWeb3Provider] = useState<MetaMaskInpageProvider | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (web3Provider) {
      const accountArr = await web3Provider.request({
        method: "eth_requestAccounts",
      });
      if (Array.isArray(accountArr) && accountArr.length > 0) setWalletInfo(accountArr[0], WALLET);
    }
  };

  // Get address
  const getAddress = (): string => {
    if (web3Provider?.selectedAddress) {
      const address = web3Provider.selectedAddress;
      return address;
    }
    return "";
  };

  // AccountChange
  const onAccountChange = (onChange: (address: string, wallet: TWALLET) => void) => {
    web3Provider?.on("accountsChanged", (accountArr) => {
      if (Array.isArray(accountArr)) {
        onChange(accountArr[0], WALLET);
      }
    });
  };

  // Remove AccountChange
  const removeAccountChange = (onChange: (address: string, wallet: TWALLET) => void) => {
    web3Provider?.removeListener("accountsChanged", (accountArr) => {
      if (Array.isArray(accountArr)) {
        onChange(accountArr[0], WALLET);
      }
    });
  };

  // Initialize solana provider state
  useEffect(() => {
    const getProvider = (): MetaMaskInpageProvider | undefined => {
      const provider = window.ethereum;
      if (provider?.isMetaMask) {
        setIsWalletInstall(true);
        return provider;
      }
    };
    const provider = getProvider();
    if (provider) setWeb3Provider(provider);
  }, []);

  return {
    web3Provider,
    isWalletInstall,
    connectWallet,
    getAddress,
    onAccountChange,
    removeAccountChange,
  };
};
