import { useContext } from "react";
import { InputContext } from "../../Context/InputContext";
import { OrderContext } from "../../Context/OrderContext";
import styles from "./AddOrderFor,.module.css";

export const AddOrderForm = () => {
  const { orderCount, setOrderCount, toolName, setToolName } =
    useContext(InputContext);

  const { addOrder } = useContext(OrderContext);

  return (
    <form className={styles.addOrderForm} onSubmit={(e) => e.preventDefault()}>
      <h3>Добавьте заказ</h3>
      <input
        value={orderCount}
        onChange={(e) => setOrderCount(e.target.value)}
        type="text"
        placeholder="№ заказа"
      />
      <input
        value={toolName}
        onChange={(e) => setToolName(e.target.value)}
        type="text"
        placeholder="Тип инструмента"
      />
      <button onClick={addOrder}>Добавить</button>
    </form>
  );
};
