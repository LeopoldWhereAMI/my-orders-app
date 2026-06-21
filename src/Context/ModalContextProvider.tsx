import { useState } from "react";
import { ModalContext } from "./ModalContext";
import type { ProviderProps } from "../types/contextTypes";

export const ModalContextProvider = ({ children }: ProviderProps) => {
  const [modalActive, setModalActive] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ modalActive, setModalActive }}>
      {children}
    </ModalContext.Provider>
  );
};
