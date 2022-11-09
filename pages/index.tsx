// React & Next
import { NextPage } from "next";
import { useState } from "react";
// Style
import styled from "styled-components";
// Types
import { useSolana } from "hooks/useSolana";

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const { connectWallet, disconnectWallet, isConnected, getAddress } = useSolana(setWalletAddress);

  return (
    <Wrapper>
      {isConnected ? (
        <h2 className="walletAddress">
          Address: <span>{walletAddress}</span>
        </h2>
      ) : (
        <h2 className="walletAddress">Phantom is not installed</h2>
      )}
      {walletAddress ? (
        <button
          className="btn"
          onClick={() => {
            disconnectWallet(walletAddress);
          }}
        >
          Disconnect
        </button>
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
