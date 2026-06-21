import type { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export const Modal = ({ active, setActive, children }: ModalProps) => {
  return (
    <div
      className={`${styles.modal} ${active ? styles.modalActive : ""}`}
      onClick={() => setActive(false)}
    >
      <section
        className={`${styles.modalContent} ${
          active ? styles.modalContentActive : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalCloseBtn}
          onClick={() => setActive(false)}
        >
          ×
        </button>
        {children}
      </section>
    </div>
  );
};
