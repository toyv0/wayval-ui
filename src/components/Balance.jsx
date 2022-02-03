import {
  useERC20Balances,
  useNativeBalance,
  useNFTBalances,
  useMoralis,
} from "react-moralis";
import { Card } from "antd";

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
};

function Balance(props) {
  const { Moralis } = useMoralis();

  const { data: assets } = useERC20Balances();
  const { data: nfts } = useNFTBalances();
  const { data: balance } = useNativeBalance();
  const loading = !nfts | !assets | !balance;

  if (!loading) {
    console.log("assets: ", assets);
    console.log("balance: ", balance);
    console.log("nfts: ", nfts);
  }

  if (assets) {
    const coins = assets.map((asset) => ({
      symbol: asset.symbol,
      balance: Moralis?.Units?.FromWei(asset.balance, asset.decimals),
      address: asset.token_address,
    }));
    console.log("coins", coins);
  }
  // if (nfts) {
  //   const collection = nfts.map((nft) => ({
  //     name: nft.name,
  //     id: nft.token_id,
  //     address: nft.token_address,
  //   }));
  //   console.log("collection", collection);
  // }

  return (
    <Card style={styles.card}>
      <div>text here</div>
    </Card>
  );
}
export default Balance;
