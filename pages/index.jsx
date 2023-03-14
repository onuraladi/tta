import { useProgram, useClaimNFT, useClaimConditions, useProgramMetadata } from "@thirdweb-dev/react/solana";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Home = () => {
  const { program } = useProgram("6VC9vUH7CsiUqPD9WQVQVVoxPQwNu1Wv4wMftXdtUUGb", "nft-drop");
  const { mutateAsync: claim, isLoading } = useClaimNFT(program);
  const {data: conditions, isLoading: conditionsIsLoading} = useClaimConditions(program);
   const {data: metadata, isLoading: metadataIsLoading} = useProgramMetadata(program);
  
  console.log(metadata);
  console.log(conditions);
  
  
  
   return (
    <>
    
      <div className={styles.container}>
      <WalletMultiButtonDynamic />

        <div className={styles.iconContainer}>
         
          
          <Image
            width={200}
            height={200}
            src="/sol.png"
            className={styles.icon}
            alt="sol"
          />
        </div>
        <h1 className={styles.h1}>Solana, meet USB 👋</h1>
        <p className={styles.explain}>
          Bridge your University Societies in {" "}
          <b>
            <a
              href="https://portal.thirdweb.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana 
            </a>
          </b>
          {" "}Ecosystem.
        </p>

        <p>{metadata?.description}</p>
        <button disabled={isLoading} onClick={() => claim({amount: 1})}>
      Claim USB NFT's to pass the bridge.
    </button>
    <p>{conditions?.totalAvailableSupply}/{conditions?.claimedSupply}</p>
      </div>
    </>
  );
};

export default Home;
