import Web3 from "web3";

export const hexToDecimal = (hex: string): string => {
  return Web3.utils.hexToNumberString(hex);
};

export const getNetworkName = (chain_id: string): TNETWORK => {
  if (chain_id === "1") {
    return "ETHEREUM";
  } else if (chain_id === "8217") {
    return "KLAYTN";
  } else if (chain_id === "42") {
    return "SOLANA";
  } else {
    return "";
  }
};
