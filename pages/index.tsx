// React & Next
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
// Style
import styled from "styled-components";
// Hooks
import useSolana from "hooks/useSolana";
import useWeb3 from "hooks/useWeb3";
import useKlaytn from "hooks/useKlaytn";
import useMobile from "hooks/useMobile";
import useResponsive from "hooks/useResponsive";
import { UseWalletConnect } from "hooks/useWalletConnect";

const TO_ADDRESS = "0x364d05346E52934e01B8FB5d7E371E02b3ce70C6";

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentWallet, setCurrentWallet] = useState<TWALLET>("");
  const [currentNetwork, setCurrentNetwork] = useState<TNETWORK>("");
  const currentWalletRef = useRef(currentWallet);

  const { isMobile, mobileBrowser, mobileOs } = useMobile();
  const { isMobileSize } = useResponsive();

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
    sendToken: sendMetamaskTokon,
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

  const { onOpenModal: connectWalletConnect } = UseWalletConnect(); // tmp

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

  const handleSendTokenClick = () => {
    if (currentWallet === "METAMASK" && walletAddress) {
      sendMetamaskTokon(walletAddress, TO_ADDRESS, "0.00003");
      return;
    }
    alert("fail");
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
      {isMobile ? (
        <TEXT>
          Real Mobile : {mobileOs} : {mobileBrowser}
        </TEXT>
      ) : (
        <TEXT>Real Desktop</TEXT>
      )}
      {isMobileSize ? <TEXT>Mobile</TEXT> : <TEXT>Desktop</TEXT>}
      {}
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
      <button className="btn" onClick={handleSendTokenClick}>
        Send token
      </button>
      <Btn_Container>
        <button className="btn" onClick={connectMetamask}>
          {isMetamaskInstall ? "Metamask Connect" : "Metamask is not installed"}
        </button>
        <button className="btn" onClick={connectKaikas}>
          {isKaikasInstall ? "Kaikas Connect" : "Kaikas is not installed"}
        </button>
        <button className="btn" onClick={connectPhantom} disabled={!isPhantomInstall}>
          {isPhantomInstall ? "Phantom Connect" : "Phantom is not installed"}
        </button>
        <button className="btn" onClick={connectWalletConnect} disabled={!isPhantomInstall}>
          {"Wallet Connect"}
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
    ${({ theme }) => theme.mixin.flexCenter};
    font-size: 30px;
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: start;
    padding-top: 30px;
    .btn {
      color: ${({ theme }) => theme.colors.nav_color};
      font-size: 20px;
    }
  }
`;

const TEXT = styled.div`
  font-size: 30px;
  color: orange;
`;

const Btn_Container = styled.div`
  display: grid;
  width: 1000px;
  height: 50px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 0 10%;
  }
`;
