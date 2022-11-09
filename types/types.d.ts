import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    phantom: any;
    ethereum?: MetaMaskInpageProvider;
    klaytn: any;
  }
}
