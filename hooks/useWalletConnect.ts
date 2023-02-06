// import { TNETWORK, TWALLET } from "@front-common-type/types";
import SignClient from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
import { useEffect, useState } from "react";

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

const web3Modal = new Web3Modal({
  projectId: PROJECT_ID,
  walletConnectVersion: 2,
  standaloneChains: ["eip155:1"],
});

export const UseWalletConnect = () => {
  const [signClient, setSignClient] = useState<SignClient | undefined>(undefined);

  // 3. Initialize sign client
  async function onInitializeSignClient() {
    const client = await SignClient.init({
      projectId: PROJECT_ID,
    });
    setSignClient(client);
  }

  // 4. Initiate connection and pass pairing uri to the modal
  async function onOpenModal() {
    console.log("sign Client", signClient);

    try {
      if (signClient) {
        const namespaces = {
          eip155: { methods: ["eth_sign"], chains: ["eip155:1"], events: ["accountsChanged"] },
        };
        const { uri, approval } = await signClient.connect({ requiredNamespaces: namespaces });

        console.log("uri", uri);

        if (uri) {
          await web3Modal.openModal({
            uri,
            standaloneChains: namespaces.eip155.chains,
          });
          console.log("after open");

          const session = await approval();
          console.log("afterapproval", session);

          web3Modal.closeModal();
        }
      }
    } catch (e) {
      console.log("error walletConnect", e);
    }
  }

  useEffect(() => {
    onInitializeSignClient();
  }, []);

  useEffect(() => {
    if (!signClient) return;

    signClient.on("session_event", ({ event }: any) => {
      console.log("event", event);
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
    });
  }, [signClient]);

  return { onOpenModal };
};
