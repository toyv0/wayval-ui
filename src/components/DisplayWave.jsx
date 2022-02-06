import { useNFTBalances } from "react-moralis";
import { useState } from "react";
import { Card, Layout } from "antd";

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
    textAlign: "center",
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
  const { data: nftData } = useNFTBalances();
  let [waves] = useState([]);
  const waveContractAddress = process.env.REACT_APP_WAVE_CONTRACT.toLowerCase();

  if (nftData?.result) {
    // console.log("NFT DATA: ", nftData);
    waves = nftData?.result
      ?.filter((nft) => nft.token_address === waveContractAddress)
      .map((item) => ({
        id: item.token_id,
        ...item.metadata,
      }));
  }

  // TODO return message for no waves

  return (
    <Layout style={styles.layout}>
      {waves?.map((wave) => (
        <Layout style={styles.layout}>
          <Card style={styles.card}>
            <header style={styles.header}>
              🌊 wave {wave?.id} minted from 🌊 {wave?.origin}
            </header>
            <header style={styles.header}>💎 hodlings 💎</header>
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
        </Layout>
      ))}
    </Layout>
  );
}
export default DisplayWave;
