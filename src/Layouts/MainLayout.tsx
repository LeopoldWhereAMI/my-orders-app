import { Header } from "../Components/Header/Header";
import { OrdersList } from "../Components/OrdersList/OrdersList";
import { Modal } from "../Modal/Modal";
import { AddOrderForm } from "../Components/AddOrderForm/AddOrderForm";
import { Dashboard } from "../Components/Dashboard/Dashboard";
import { Footer } from "../Components/Footer/Footer";
import { useContext } from "react";
import { ModalContext } from "../Context/ModalContext";
import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  const { modalActive, setModalActive } = useContext(ModalContext);

  return (
    <>
      <Header setActive={setModalActive} />

      <div className={styles.mainLayout}>
        <OrdersList />
      </div>

      <Modal active={!!modalActive} setActive={() => setModalActive(null)}>
        {modalActive === "addOrder" && <AddOrderForm />}
        {modalActive === "dashboard" && <Dashboard />}
      </Modal>

      <Footer />
    </>
  );
};
