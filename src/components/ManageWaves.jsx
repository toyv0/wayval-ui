import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Card, Layout, Button } from "antd";
import waveAbi from "../abi/Wave.json";
import { useMoralis } from "react-moralis";

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
    width: "550px",
    marginTop: "5px",
    marginBottom: "20px",
    borderRadius: "0.5rem",
    fontSize: "16px",
    fontWeight: "500",
    color: "#212E42",
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

function ManageWaves() {
  let [isRecovering] = useState(false);
  let [isLoading, setLoading] = useState(true);
  let [waves] = useState([]);
  const { account } = useMoralis();
  const waveContractAddress = process.env.REACT_APP_WAVE_CONTRACT.toLowerCase();
  let [waveData, setWaveData] = useState([]);
  let [deployedWaves] = useState([]);

  const getWavesCreated = async () => {
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

        waves = await waveContract.wavesMinted(account);

        console.log("waves: ", waves);

        const waveMap = await Promise.all(
          waves.map(async (wave) => {
            return {
              id: Number(wave._hex),
              owner: await waveContract.ownerOf(Number(wave._hex)),
            };
          }),
        );

        waveMap.forEach(function (wave) {
          if (wave.owner.toLowerCase() !== account) {
            deployedWaves.push(wave);
          }
        });

        setWaveData(deployedWaves);

        setLoading(false);
      } else {
        console.log("ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToBurn = async (tokenId) => {
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

        let waveTxn = await waveContract.recoverWave(tokenId);

        isRecovering = true;
        console.log(`recovering wave ${tokenId}: `, isRecovering);

        await waveTxn.wait();

        isRecovering = false;
        console.log(`recovered wave!`, tokenId);
        console.log(
          `see transaction: https://mumbai.polygonscan.com/tx/${waveTxn.hash}`,
        );
      } else {
        console.log("ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWavesCreated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO return message for no waves created

  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
        <Button
          size="large"
          type="primary"
          style={styles.button}
          onClick={getWavesCreated}
        >
          refresh
        </Button>
      </div>
    );
  }
  console.log("waveData", waveData);

  return (
    <Layout style={styles.layout}>
      {waveData?.map((wave) => (
        <div key={wave.id} style={styles.input}>
          <Button
            size="large"
            type="primary"
            style={styles.button}
            onClick={() => askContractToBurn(wave.id)}
          >
            🐕 recover wave {wave.id} at {wave.owner} 🏃
          </Button>
        </div>
      ))}
    </Layout>
  );
}
export default ManageWaves;
