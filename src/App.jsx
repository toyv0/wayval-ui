import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import { Layout, Button } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import logo from "./images/wve.jpg";
import Wave from "components/Wave";
const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#4A74A8",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#212E42",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    //borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  layout: {
    background: "#212E42",
    height: "100vh",
    overflow: "auto",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const [input, setInput] = useState("");

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Logo />
        <div style={styles.headerRight}>
          <Chains />
          <Account />
        </div>
      </Header>

      <div style={styles.content}>
        {isAuthenticated === true ? (
          <div>
            <Wave />
          </div>
        ) : (
          <div>connect wallet first</div>
        )}
      </div>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex", padding: "0 10px" }}>
    <img
      height="50px"
      width="50px"
      padding="0 10px"
      src={logo}
      alt="logo"
    ></img>
  </div>
);

export default App;
