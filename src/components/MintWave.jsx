import {
  useERC20Balances,
  useNativeBalance,
  useNFTBalances,
  useMoralis,
} from "react-moralis";
import { ethers } from "ethers";
import { useState } from "react";
import { Card, Layout, Button } from "antd";
import waveAbi from "../abi/Wave.json";

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
    justifyContent: "center",
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
    marginTop: "10px",
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

function MintWave() {
  const { Moralis, account } = useMoralis();
  const { data: tokenData } = useERC20Balances();
  const { data: nftData } = useNFTBalances();
  const { data: balanceData } = useNativeBalance();
  let [wave] = useState("");
  let [minting] = useState(false);
  let [tokenInfo] = useState([]);
  let [nftInfo] = useState([]);
  let [balanceInfo] = useState({});
  const [input, setInput] = useState("");
  const waveContractAddress = process.env.REACT_APP_WAVE_CONTRACT;

  if (balanceData.balance) {
    const splitFormatted = balanceData.formatted.split(" ");
    balanceInfo = {
      balance: splitFormatted[0],
      symbol: splitFormatted[1],
    };
  }
  if (tokenData) {
    tokenInfo = tokenData.map((asset) => ({
      symbol: asset.symbol,
      balance: parseFloat(
        Moralis?.Units?.FromWei(asset.balance, asset.decimals),
      ).toFixed(6),
      address: asset.token_address,
    }));
  }

  if (nftData?.result) {
    nftInfo = nftData?.result?.map((nft) => ({
      name: nft.name,
      id: nft.token_id,
      address: nft.token_address,
    }));
  }

  wave = {
    tokens: tokenInfo,
    nfts: nftInfo,
    nativeBalance: balanceInfo,
    origin: account,
  };

  const askContractToMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveContract = new ethers.Contract(
          waveContractAddress,
          waveAbi.abi,
          signer,
        );

        const waveData = Buffer.from(JSON.stringify(wave)).toString("base64");

        let waveTxn = await waveContract.makeWave(
          `data:application/json;base64,${waveData}`,
          input,
        );

        minting = true;
        console.log("wave minting: ", minting);
        await waveTxn.wait();

        minting = false;
        console.log("wave minting: ", minting);
        console.log(
          `minted wave! see transaction: https://mumbai.polygonscan.com/tx/${waveTxn.hash}`,
        );
      } else {
        console.log("ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={styles.layout}>
      <Card style={styles.card}>
        <header style={styles.header}>Address</header>
        <div>{account}</div>
        <header>Assets</header>
        <div>
          {balanceInfo.symbol} {balanceInfo.balance}
        </div>
        <div>
          {tokenInfo?.map((token) => (
            <div key={token.symbol}>
              {token.symbol} {token.balance}
            </div>
          ))}
        </div>
        <div>
          {nftInfo?.map((nft) => (
            <div>
              {nft.name} {nft.id}
            </div>
          ))}
        </div>
      </Card>
      <div style={styles.input}>
        <input
          value={input}
          style={input ? styles.inputBox : styles.placeholderStyles}
          placeholder="receiving address"
          onInput={(e) => setInput(e.target.value)}
        />
      </div>
      <div style={styles.input}>
        <Button
          size="large"
          type="primary"
          style={styles.button}
          onClick={askContractToMint}
        >
          🌊 mint wave 🌊
        </Button>
      </div>
    </Layout>
  );
}
export default MintWave;
