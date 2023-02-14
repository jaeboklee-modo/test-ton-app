import { useMemo } from "react";
import { toUserFriendlyAddress } from "@tonconnect/sdk";

export function useFriendlyAddress(address: string | null | undefined) {
  return useMemo(() => {
    if (!address) {
      return "";
    }

    // use any library to convert address from 0:<hex> format to user-friendly format
    const userFriendlyAddress = toUserFriendlyAddress(address);

    return userFriendlyAddress;
  }, [address]);
}
