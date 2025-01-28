export function toHex(value) {
  if (typeof value !== "number" && typeof value !== "bigint") {
    throw new Error("Input must be a number or bigint.");
  }
  // Convert the number or bigint to a hex string and add the "0x" prefix
  return `0x${value.toString(16)}`;
}
