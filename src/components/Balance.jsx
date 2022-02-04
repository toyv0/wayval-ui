import {
  useERC20Balances,
  useNativeBalance,
  useNFTBalances,
  useMoralis,
} from "react-moralis";
import { useState } from "react";
import { Card } from "antd";
import { render } from "@testing-library/react";

const styles = {
  card: {
    boxShadow: "0 0.2rem 1.2rem rgb(189 197 209 / 20%)",
    border: "2px solid rgb(74, 116, 168)",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
    background: "#4A74A8",
  },
  header: {
    justifyContent: "center",
  },
};

function Balance() {
  const { Moralis, account } = useMoralis();
  const { data: tokenData } = useERC20Balances();
  const { data: nftData } = useNFTBalances();
  const { data: balanceData } = useNativeBalance();
  let [wave] = useState("");
  let [tokenInfo] = useState([]);
  let [nftInfo] = useState([]);
  let [balanceInfo] = useState({});

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
    console.log(nftData);
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
    account: account,
    signature: "",
  };

  const loading = !wave;
  if (!loading) console.log("WAVE: ", wave);

  return (
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
  );
}
export default Balance;
