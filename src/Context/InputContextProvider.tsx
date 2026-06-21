import { useState } from "react";
import { InputContext } from "./InputContext";
import type { ProviderProps } from "../types/contextTypes";

export const InputContextProvider = ({ children }: ProviderProps) => {
  const [orderCount, setOrderCount] = useState("");
  const [toolName, setToolName] = useState("");

  return (
    <InputContext.Provider
      value={{ orderCount, setOrderCount, toolName, setToolName }}
    >
      {children}
    </InputContext.Provider>
  );
};
