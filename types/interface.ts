import { PublicKey, Transaction } from "@solana/web3.js";

export type TDisplayEncoding = "utf8" | "hex";
export type TPhantomEvent = "disconnect" | "connect" | "accountChanged";
export type TPhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

export interface IConnectOpts {
  onlyIfTrusted: boolean;
}

export interface IPhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (message: Uint8Array | string, display?: TDisplayEncoding) => Promise<any>;
  connect: (opts?: Partial<IConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: TPhantomEvent, handler: (args: any) => void) => void;
  request: (method: TPhantomRequestMethod, params: any) => Promise<unknown>;
}
