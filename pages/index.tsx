// React & Next
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
// Style
import styled from "styled-components";
// Hooks
import { useSolana } from "hooks/useSolana";
import { useWeb3 } from "hooks/useWeb3";
import { useKlaytn } from "hooks/useKlaytn";

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentWallet, setCurrentWallet] = useState<TWALLET>("");
  const [currentNetwork, setCurrentNetwork] = useState<TNETWORK>("");
  const currentWalletRef = useRef(currentWallet);

  const setWalletInfo = (address: string, wallet: TWALLET) => {
    console.log("set wallet info", address, wallet);
    setWalletAddress(address);
    setCurrentWallet(wallet);
    currentWalletRef.current = wallet;
  };

  const {
    web3Provider,
    isWalletInstall: isMetamaskInstall,
    connectWallet: connectMetamask,
    getAddress: getMetamaskAddress,
    onAccountChange: onMetamaskAccountChange,
    removeAccountChange: removeMetamaskAccountChange,
  } = useWeb3(setWalletInfo);
  const {
    klaytnProvider,
    isWalletInstall: isKaikasInstall,
    connectWallet: connectKaikas,
    getAddress: getKaikasAddress,
    onAccountChange: onKaikasAccountChange,
    onDisconnect: onKaikasDisconnect,
  } = useKlaytn(setWalletInfo);
  const {
    solanaProvider,
    isWalletInstall: isPhantomInstall,
    connectWallet: connectPhantom,
    getAddress: getPhantomAddress,
    onAccountChange: onPhantomAccountChange,
    onDisconnect: onPhantomDisconnect,
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

  const handleAccountChange = (address: string, wallet: TWALLET) => {
    if (currentWalletRef.current === wallet) {
      console.log("handle account change", wallet, address);
      if (currentWalletRef.current === "PHANTOM") {
        connectPhantom();
      } else {
        setWalletInfo(address, wallet);
      }
    }
  };

  const handleDisconnect = () => {
    console.log("handle disConnect");
    setWalletInfo("", "");
  };

  useEffect(() => {
    if (web3Provider) {
      onMetamaskAccountChange(handleAccountChange);
    }

    if (klaytnProvider) {
      onKaikasAccountChange(handleAccountChange);
      onKaikasDisconnect(handleDisconnect);
    }

    if (solanaProvider) {
      onPhantomAccountChange(handleAccountChange);
      // detect disconnect is not working
      onPhantomDisconnect(handleDisconnect);
    }

    return () => {
      removeMetamaskAccountChange(handleAccountChange);
    };
  }, [web3Provider, klaytnProvider, solanaProvider]);

  return (
    <Wrapper>
      <h2 className="walletAddress">
        Wallet: <span>{currentWallet}</span>
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
  }
  .btn {
    color: ${({ theme }) => theme.colors.primary_color};
    font-size: 30px;
    padding: 10px 20px;
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 1000px;
  height: 50px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
