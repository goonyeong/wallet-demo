// React & Next
import { NextPage } from "next";
import { useState } from "react";
// Style
import styled from "styled-components";
// Hooks
import { useSolana } from "hooks/useSolana";
import { useWeb3 } from "hooks/useWeb3";
import { useKlaytn } from "hooks/useKlaytn";

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currentWallet, setCurrentWallet] = useState<TWALLET>("");

  const setWalletInfo = (address: string, wallet: TWALLET) => {
    setWalletAddress(address);
    setCurrentWallet(wallet);
  };

  const {
    isWalletInstall: isMetamaskInstall,
    connectWallet: connectMetamask,
    getAddress: getMetamaskAddress,
  } = useWeb3(setWalletInfo);
  const {
    isWalletInstall: isKaikasInstall,
    connectWallet: connectKaikas,
    getAddress: getKaikasAddress,
  } = useKlaytn(setWalletInfo);
  const {
    isWalletInstall: isPhantomInstall,
    connectWallet: connectPhantom,
    getAddress: getPhantomAddress,
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
