// React & Next
import { NextPage } from "next";
import { useEffect, useState } from "react";
// Style
import styled from "styled-components";
// Utils
import { useRouter } from "next/router";
// Types
import { IPhantomProvider } from "types/interface";
import { useSolana } from "wallet/wallet";

const Home: NextPage = () => {
  const [walletKey, setWalletKey] = useState<string>("");

  const { connectWallet, disconnectWallet, isPhantom, getAddress } = useSolana();

  console.log("is p", isPhantom);

  return (
    <Wrapper>
      {isPhantom ? (
        <h2 className="walletAddress">
          Address: <span>{walletKey}</span>
        </h2>
      ) : (
        <h2 className="walletAddress">Phantom is not installed</h2>
      )}
      {walletKey ? (
        <button
          className="btn"
          onClick={() => {
            disconnectWallet(walletKey);
            setWalletKey("");
          }}
        >
          Disconnect
        </button>
      ) : (
        <button
          className="btn"
          onClick={async () => {
            const result = await connectWallet();
            if (result) {
              setWalletKey(result);
            } else {
              console.log("dd", result);
            }
          }}
        >
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
