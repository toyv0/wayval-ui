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

function Balance() {
  const { Moralis, account } = useMoralis();
  const { data: tokenData } = useERC20Balances();
  const { data: nftData } = useNFTBalances();
  const { data: balanceData } = useNativeBalance();
  let wave;

  if (balanceData.balance && nftData && tokenData) {
    const splitFormatted = balanceData.formatted.split(" ");

    const tokenInfo = tokenData.map((asset) => ({
      symbol: asset.symbol,
      balance: parseFloat(
        Moralis?.Units?.FromWei(asset.balance, asset.decimals),
      ).toFixed(6),
      address: asset.token_address,
    }));
    const nftInfo = nftData.result.map((nft) => ({
      name: nft.name,
      id: nft.token_id,
      address: nft.token_address,
    }));
    const balanceInfo = {
      balance: splitFormatted[0],
      symbol: splitFormatted[1],
    };

    wave = {
      tokens: tokenInfo,
      nfts: nftInfo,
      nativeBalance: balanceInfo,
      account: account,
      signature: "",
    };
  }

  const loading = !wave;
  if (!loading) console.log("WAVE: ", wave);

  return (
    <Card style={styles.card}>
      <div>text here</div>
    </Card>
  );
}
export default Balance;
