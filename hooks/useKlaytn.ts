import useDevice from "hooks/useDevice";
import { useState, useEffect } from "react";
import { getNetworkName } from "utils/common";

const WALLET = "KAIKAS";
const DEEPLINK = "kaikas://path/";
const MARKET_ANDROID = "https://naver.com";
const MARKET_IOS = "https://apps.apple.com/kr/app/kaikas-mobile-crypto-wallet/id1626107061";

const useKlaytn = (
  setWalletInfo: (address: string, wallet: TWALLET, network: TNETWORK) => void
) => {
  const [klaytnProvider, setKlaytnProvider] = useState<any | undefined>(undefined);
  const [isWalletInstall, setIsWalletInstall] = useState(false);

  const { isMobileDevice } = useDevice();

  const [_navigator, _setNavigator] = useState<Navigator | null>(null);

  // 모바일 기기 종류 파악후, 앱스토어로 이동하기
  useEffect(() => {
    if (navigator) {
      _setNavigator(navigator);
    }
  }, []);

  useEffect(() => {
    if (_navigator) {
      const ua = _navigator.userAgent.toLowerCase();
      console.log(ua.indexOf("android"));

      if (window.confirm("스토어로 이동하시겠습니까?")) {
        location.href = ua.indexOf("android") > -1 ? MARKET_ANDROID : MARKET_IOS;
      }
    }
  }, [_navigator]);

  // Connect wallet
  const connectWallet = async () => {
    if (isMobileDevice) {
      const exeDeepLink = () => {
        const url = DEEPLINK;
        location.href = url;
      };
      exeDeepLink();
    }
    if (klaytnProvider) {
      const accountArr = await klaytnProvider.enable();
      if (Array.isArray(accountArr) && accountArr.length > 0)
        setWalletInfo(accountArr[0], WALLET, getNetwork());
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

  // Get network
  const getNetwork = (): TNETWORK => {
    if (klaytnProvider?.networkVersion) {
      const chain_id = klaytnProvider.networkVersion.toString();

      return getNetworkName(chain_id);
    }

    return "";
  };

  // Disconnect
  const onDisconnect = (disconnect: () => void) => {
    klaytnProvider?.on("disconnected", disconnect);
  };

  // AccountChange
  const onAccountChange = (
    onChange: (address: string, wallet: TWALLET, network: TNETWORK) => void
  ) => {
    klaytnProvider?.on("accountsChanged", (accountArr: Array<any> | unknown) => {
      if (Array.isArray(accountArr)) {
        onChange(accountArr[0], WALLET, getNetwork());
      }
    });
  };

  // NetworkChange
  const onNetworkChange = (onChange: (network: TNETWORK, wallet: TWALLET) => void) => {
    klaytnProvider?.on("networkChanged", (id: number) => {
      console.log(id);
      const network = getNetworkName(id.toString());
      onChange(network, WALLET);
    });
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
    onNetworkChange,
    onDisconnect,
  };
};

export default useKlaytn;
