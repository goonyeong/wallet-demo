// React & Next
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
// Style
import styled from "styled-components";
// Hooks
import { useSolana } from "hooks/useSolana";
import { useWeb3 } from "hooks/useWeb3";
import { useKlaytn } from "hooks/useKlaytn";
import { getNetworkName } from "utils/common";
import { useMediaQuery } from "react-responsive";
import { MAX_MOBILE_WIDTH } from "types/constants";

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentWallet, setCurrentWallet] = useState<TWALLET>("");
  const [currentNetwork, setCurrentNetwork] = useState<TNETWORK>("");
  const currentWalletRef = useRef(currentWallet);

  const [isMobile, setIsMobile] = useState(false);
  const isMobileQuery = useMediaQuery({ maxWidth: MAX_MOBILE_WIDTH });

  const setWalletInfo = (address: string, wallet: TWALLET, network: TNETWORK) => {
    console.log("set wallet info:", address, wallet, network);
    setWalletAddress(address);
    setCurrentWallet(wallet);
    setCurrentNetwork(network);
    currentWalletRef.current = wallet;
  };

  const {
    web3Provider,
    isWalletInstall: isMetamaskInstall,
    connectWallet: connectMetamask,
    getAddress: getMetamaskAddress,
    onAccountChange: onMetamaskAccountChange,
    onNetworkChange: onMetamaskNetworkChange,
  } = useWeb3(setWalletInfo);
  const {
    klaytnProvider,
    isWalletInstall: isKaikasInstall,
    connectWallet: connectKaikas,
    getAddress: getKaikasAddress,
    onAccountChange: onKaikasAccountChange,
    onNetworkChange: onKaikasNetworkChange,
    onDisconnect: onKaikasDisconnect,
  } = useKlaytn(setWalletInfo);
  const {
    solanaProvider,
    isWalletInstall: isPhantomInstall,
    connectWallet: connectPhantom,
    getAddress: getPhantomAddress,
    onAccountChange: onPhantomAccountChange,
  } = useSolana(setWalletInfo);

  const handleGetAddressClick = () => {
    if (currentWallet === "METAMASK") {
      alert(getMetamaskAddress());
    } else if (currentWallet === "KAIKAS") {
      alert(getKaikasAddress());
    } else if (currentWallet === "PHANTOM") {
      alert(getPhantomAddress());
    } else {
      return;
    }
  };

  const handleAccountChange = (address: string, wallet: TWALLET, network: TNETWORK) => {
    if (currentWalletRef.current === wallet) {
      console.log("handle account change:", wallet, address, network);
      setWalletInfo(address, wallet, network);
    }
  };

  const handleNetworkChange = (network: TNETWORK, wallet: TWALLET) => {
    if (currentWalletRef.current === wallet) {
      setCurrentNetwork(network);
    }
  };

  const handleDisconnect = () => {
    console.log("handle disConnect");
    setWalletInfo("", "", "");
  };

  useEffect(() => {
    console.log(isMobileQuery);
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  useEffect(() => {
    if (web3Provider) {
      onMetamaskAccountChange(handleAccountChange);
      onMetamaskNetworkChange(handleNetworkChange);
    }

    if (klaytnProvider) {
      onKaikasAccountChange(handleAccountChange);
      onKaikasNetworkChange(handleNetworkChange);
      onKaikasDisconnect(handleDisconnect);
    }

    if (solanaProvider) {
      onPhantomAccountChange(handleAccountChange);
    }
  }, [web3Provider, klaytnProvider, solanaProvider]);

  return (
    <Wrapper>
      {isMobile ? <div>Mobile</div> : <div>Desktop</div>}
      <h2 className="walletAddress">
        Wallet: <span>{currentWallet}</span>
      </h2>
      <h2 className="walletAddress">
        Network: <span>{currentNetwork ? currentNetwork : "UNKNOWN"}</span>
      </h2>
      <h2 className="walletAddress">
        Address: <span>{walletAddress}</span>
      </h2>
      <button className="btn" onClick={handleGetAddressClick}>
        Get Address
      </button>
      <Btn_Container>
        <button className="btn" onClick={connectMetamask} disabled={!isMetamaskInstall}>
          {isMetamaskInstall ? "Metamask Connect" : "Metamask is not installed"}
        </button>
        <button className="btn" onClick={connectKaikas} disabled={!isKaikasInstall}>
          {isKaikasInstall ? "Kaikas Connect" : "Kaikas is not installed"}
        </button>
        <button className="btn" onClick={connectPhantom} disabled={!isPhantomInstall}>
          {isPhantomInstall ? "Phantom Connect" : "Phantom is not installed"}
        </button>
      </Btn_Container>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.mixin.flexCenter};
  flex-direction: column;
  gap: 30px;
  .walletAddress {
    font-size: 30px;
    span {
      color: #28a964;
    }
  }
  .btn {
    color: ${({ theme }) => theme.colors.primary_color};
    font-size: 30px;
    padding: 10px 20px;
    cursor: pointer;
    @media ${({ theme }) => theme.device.tablet} {
      color: ${({ theme }) => theme.colors.secondary_color};
    }
    @media ${({ theme }) => theme.device.mobile} {
      color: ${({ theme }) => theme.colors.nav_color};
    }
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 1000px;
  height: 50px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
