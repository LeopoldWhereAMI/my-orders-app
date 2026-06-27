import { useContext, useState } from "react";
import { OrderItem } from "../OrderItem/OrderItem";
import { OrderContext } from "../../Context/OrderContext";
import { SearchInput } from "../SearcInput/SearchInput";
import styles from "./OrdersList.module.css";

export const OrdersList = () => {
  const { orders } = useContext(OrderContext);
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const listoShoow = inputValue
    ? orders.filter((order) => String(order.orderCount).includes(inputValue))
    : orders;

  return (
    <div className={styles.orderListWrapper}>
      <label htmlFor="search-input" className="visually-hidden">
        Поиск заказа...{" "}
      </label>
      <SearchInput
        className={styles.searchInput}
        placeholder="Поиск заказа..."
        inputValue={inputValue}
        handleInput={handleInput}
      />

      <div className={styles.ordersList} data-testid="order-list">
        {listoShoow.length > 0 &&
          listoShoow.map((order) => (
            <div key={order.id}>
              <OrderItem order={order} />
            </div>
          ))}
      </div>
    </div>
  );
};
