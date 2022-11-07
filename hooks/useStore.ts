import { Store } from "../pages/index";
import { useContext } from "react";

export function useStore() {
  const context = useContext(Store);
  if (context === null)
    throw new Error("useStore must be used within a StoreProvider");
  return context;
}
