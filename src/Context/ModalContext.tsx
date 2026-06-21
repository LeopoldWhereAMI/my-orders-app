import { createContext, type Dispatch, type SetStateAction } from "react";

type ModalContextType = {
  modalActive: string | null;
  setModalActive: Dispatch<SetStateAction<string | null>>;
};

export const ModalContext = createContext<ModalContextType>({
  modalActive: null,
  setModalActive: () => {},
});
