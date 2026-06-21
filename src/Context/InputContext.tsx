import { createContext, type Dispatch, type SetStateAction } from "react";

type InputContextType = {
  orderCount: string;
  toolName: string;
  setOrderCount: Dispatch<SetStateAction<string>>;
  setToolName: Dispatch<SetStateAction<string>>;
};

export const InputContext = createContext<InputContextType>({
  orderCount: "",
  toolName: "",
  setOrderCount: () => {},
  setToolName: () => {},
});
