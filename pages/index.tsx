// React & Next
import { NextPage } from "next";
import { useEffect, useState } from "react";
// Style
import styled from "styled-components";
// Hooks
import { useSolana } from "hooks/useSolana";
import { useWeb3 } from "hooks/useWeb3";
import { useKlaytn } from "hooks/useKlaytn";

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  // const { connectWallet, disconnectWallet, isWalletInstall, getAddress } =
  //   useSolana(setWalletAddress);
  // const { isWalletInstall, connectWallet, getAddress } = useWeb3(setWalletAddress);
  const { isWalletInstall, connectWallet, getAddress } = useKlaytn(setWalletAddress);

  return (
    <Wrapper>
      {isWalletInstall ? (
        <>
          {walletAddress ? (
            <h2 className="walletAddress">
              Address: <span>{walletAddress}</span>
            </h2>
          ) : (
            <button className="btn" onClick={connectWallet}>
              Connect
            </button>
          )}
          <button
            className="btn"
            onClick={() => {
              alert(getAddress());
            }}
          >
            Get Address
          </button>
        </>
      ) : (
        <h2 className="walletAddress">Phantom is not installed</h2>
      )}
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
