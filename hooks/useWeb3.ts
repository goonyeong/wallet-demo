import useMobile from "hooks/useMobile";
import { useState, useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getNetworkName, hexToDecimal } from "utils/common";
import Web3 from "web3";

const WALLET = "METAMASK";
const DEEPLINK = "https://metamask.app.link/dapp/abcd.com/"; // Dapp 주소

const convertEthToWeihex = (eth: string): string => {
  const wei = Web3.utils.toWei(eth, "ether");
  const weihex = Web3.utils.numberToHex(wei);
  return weihex;
};

const useWeb3 = (setWalletInfo: (address: string, wallet: TWALLET, network: TNETWORK) => void) => {
  const [web3Provider, setWeb3Provider] = useState<MetaMaskInpageProvider | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  const { isMobile, mobileOs, mobileBrowser } = useMobile();

  // Connect wallet
  const connectWallet = async () => {
    if (isMobile && mobileBrowser !== null) {
      window.location.href = DEEPLINK;
    }

    // Web
    if (web3Provider) {
      const accountArr = await web3Provider.request({
        method: "eth_requestAccounts",
      });
      if (Array.isArray(accountArr) && accountArr.length > 0)
        setWalletInfo(accountArr[0], WALLET, getNetwork());
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

  // Get network
  const getNetwork = (): TNETWORK => {
    if (web3Provider?.networkVersion) {
      const chain_id = web3Provider.networkVersion;

      return getNetworkName(chain_id);
    }
    return "";
  };

  // Send Token
  const sendToken = async (from: string, to: string, value: string) => {
    if (web3Provider) {
      const result = await web3Provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to,
            value: convertEthToWeihex(value),
          },
        ],
      });

      if (result) {
        alert(`sending success :${result}`);
      }
    }
  };

  // AccountChange
  const onAccountChange = (
    onChange: (address: string, wallet: TWALLET, network: TNETWORK) => void
  ) => {
    web3Provider?.on("accountsChanged", (accountArr) => {
      if (Array.isArray(accountArr)) {
        onChange(accountArr[0], WALLET, getNetwork());
      }
    });
  };

  // NetworkChange
  const onNetworkChange = (onChange: (network: TNETWORK, wallet: TWALLET) => void) => {
    web3Provider?.on("chainChanged", (id) => {
      if (typeof id === "string") {
        const network = getNetworkName(hexToDecimal(id));
        onChange(network, WALLET);
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
    getNetwork,
    sendToken,
    onAccountChange,
    onNetworkChange,
  };
};

export default useWeb3;
