import { useContext } from "react";
import { OrderContext, type Order } from "../../Context/OrderContext";
import styles from "./OrderItem.module.css";

type OrderItemProps = {
  order: Order;
};

export const OrderItem = ({ order }: OrderItemProps) => {
  const { deleteOrder } = useContext(OrderContext);

  return (
    <div className={styles.orderItem} data-testid="order-item">
      <div className={styles.header}>
        <p>
          <strong>№ заказа:</strong>
          <span>{order.orderCount}</span>
        </p>
        <button
          onClick={() => deleteOrder(order.id)}
          title="Удалить"
          aria-label="Удалить заказ"
        >
          ×
        </button>
      </div>
      <p>
        <strong>Инструмент:</strong>
        <span>{order.toolName}</span>
      </p>
      <p>
        <strong>Дата приёма:</strong>
        <span>{new Date(order.date).toLocaleString()}</span>
      </p>
    </div>
  );
};
