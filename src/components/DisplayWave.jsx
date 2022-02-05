import { useNFTBalances, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useState } from "react";
import { Card, Layout, Button } from "antd";

const styles = {
  card: {
    boxShadow: "0 0.2rem 1.2rem rgb(189 197 209 / 20%)",
    border: "2px solid rgb(74, 116, 168)",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
    background: "#4A74A8",
    marginTop: "10px",
  },
  layout: {
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
    background: "#212E42",
  },
  header: {
    textAlign: "center",
  },
  inputBox: {
    boxShadow: "0 0.2rem 1.2rem rgb(189 197 209 / 20%)",
    border: "2px solid rgb(74, 116, 168)",
    borderRadius: ".5rem",
    width: "500px",
    fontSize: "16px",
    fontWeight: "500",
    background: "#4A74A8",
    color: "#17202D",
  },
  placeholderStyles: {
    boxShadow: "0 0.2rem 1.2rem rgb(189 197 209 / 20%)",
    border: "2px solid rgb(74, 116, 168)",
    borderRadius: ".5rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
    background: "#4A74A8",
    color: "#212E42",
  },
  button: {
    width: "500px",
    marginTop: "5px",
    marginBottom: "20px",
    borderRadius: "0.5rem",
    fontSize: "16px",
    fontWeight: "500",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#4A74A8",
    marginTop: "10px",
    width: "450px",
  },
};

function DisplayWave() {
  const { Moralis, account } = useMoralis();
  const { data: nftData } = useNFTBalances();
  let [burning] = useState(false);
  let [waves] = useState([]);
  const waveContractAddress = process.env.REACT_APP_WAVE_CONTRACT.toLowerCase();

  if (nftData?.result) {
    console.log("NFT DATA: ", nftData);
    waves = nftData?.result
      ?.filter((nft) => nft.token_address === waveContractAddress)
      .map((item) => ({
        id: item.token_id,
        ...item.metadata,
      }));
  }

  console.log("WAVES ONLY: ", waves);

  const askContractToBurn = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        // const waveContract = new ethers.Contract(
        //   "0x8742381E909eD53a76d72A07eA87847e58d1D837",
        //   waveAbi.abi,
        //   signer,
        // );

        // let waveTxn = await waveContract.burnWave(
        //   // msg.signer
        //   // waveId
        // );

        //await waveTxn.wait();

        console.log(`burned wave!`);
      } else {
        console.log("ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return message for no waves

  console.log(waves[0]?.account);

  return (
    <Layout style={styles.layout}>
      {waves?.map((wave) => (
        <Layout style={styles.layout}>
          <Card style={styles.card}>
            <header style={styles.header}>
              🌊 wave {wave?.id} minted from 🌊 {wave?.origin}
            </header>
            <div>
              {wave?.nativeBalance?.symbol} {wave?.nativeBalance?.balance}
            </div>
            <div>
              {wave?.tokens?.map((token) => (
                <div key={token?.symbol}>
                  {token?.symbol} {token?.balance}
                </div>
              ))}
            </div>
            <div>
              {wave?.nfts?.map((nft) => (
                <div key={nft?.symbol}>
                  {nft?.name} {nft?.id}
                </div>
              ))}
            </div>
          </Card>
          <div style={styles.input}>
            <Button
              size="large"
              type="primary"
              style={styles.button}
              onClick={null}
            >
              🔥 burn wave 🔥
            </Button>
          </div>
        </Layout>
      ))}
    </Layout>
  );
}
export default DisplayWave;
