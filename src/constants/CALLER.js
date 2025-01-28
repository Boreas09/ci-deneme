export const CALLER_ADDRESS = "0xC7f5D5D3725f36CF36477B84010EB8DdE42D3636";

export const CALLER_CONTRACT_ABI = [
  {
    inputs: [{ internalType: "address", name: "calc", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "callCalculator",
    outputs: [{ internalType: "uint256", name: "sum", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
