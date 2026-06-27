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
      <label htmlFor="order-number" className="visually-hidden">
        № заказа
      </label>
      <input
        value={orderCount}
        onChange={(e) => setOrderCount(e.target.value)}
        type="text"
        placeholder="№ заказа"
        id="order-number"
      />
      <label htmlFor="order-type" className="visually-hidden">
        Тип инструмента
      </label>
      <input
        value={toolName}
        onChange={(e) => setToolName(e.target.value)}
        type="text"
        placeholder="Тип инструмента"
        id="order-type"
      />
      <button onClick={addOrder}>Сохранить</button>
    </form>
  );
};
