import { useState, useEffect } from "react";
import { IPhantomProvider } from "types/interface";
import { PublicKey } from "@solana/web3.js";
import { MetaMaskInpageProvider } from "@metamask/providers";

export const useWeb3 = (setAddress: (address: string) => void) => {
  const [web3Provider, setWeb3Provider] = useState<MetaMaskInpageProvider | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
    if (web3Provider) {
      const accountArr = await web3Provider.request({
        method: "eth_requestAccounts",
      });
      if (Array.isArray(accountArr) && accountArr.length > 0) setAddress(accountArr[0]);
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

  // connect, unconnect, change -> wallet address update
  useEffect(() => {
    // AccountChange
    const onAccountChange = () => {
      web3Provider?.on("accountsChanged", (accountArr) => {
        if (Array.isArray(accountArr)) {
          setAddress(accountArr[0]);
        }
      });
    };

    //Remove AccountChange
    const removeAccountChange = () => {
      web3Provider?.removeListener("accountsChanged", (accountArr) => {
        if (Array.isArray(accountArr)) {
          setAddress(accountArr[0]);
        }
      });
    };

    if (web3Provider) {
      onAccountChange();
    }

    return () => {
      removeAccountChange();
    };
  }, [web3Provider]);

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
    isWalletInstall,
    connectWallet,
    getAddress,
  };
};
