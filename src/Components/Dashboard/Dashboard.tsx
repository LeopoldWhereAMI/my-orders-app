import { useContext, useMemo, useState } from "react";
import { OrderContext } from "../../Context/OrderContext";
import styles from "./Dashboard.module.css";

type Range = {
  start: string | null;
  end: string | null;
};

export const Dashboard = () => {
  const { ordersHistory, clearHistory } = useContext(OrderContext);
  const [range, setRange] = useState<Range>({
    start: null,
    end: null,
  });

  const filteredOrders = useMemo(() => {
    if (!range.start || !range.end) return [];

    const start = new Date(range.start);
    start.setHours(0, 0, 0, 0);

    const end = new Date(range.end);
    end.setHours(23, 59, 59, 999);

    return ordersHistory.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= start && orderDate <= end;
    });
  }, [ordersHistory, range]);

  return (
    <section className={styles.dashboard}>
      <h2>📊 История заказов</h2>
      <div className={styles.datePicker}>
        <input
          type="date"
          onChange={(e) =>
            setRange((prev) => ({ ...prev, start: e.target.value || null }))
          }
        />
        <span>—</span>
        <input
          type="date"
          onChange={(e) =>
            setRange((prev) => ({ ...prev, end: e.target.value || null }))
          }
        />
      </div>

      <div className={styles.result}>
        {range.start && range.end ? (
          <p>
            Заказы с <b>{new Date(range.start).toLocaleDateString()}</b> по{" "}
            <b>{new Date(range.end).toLocaleDateString()}</b>:{" "}
            <strong>{filteredOrders.length}</strong>
          </p>
        ) : (
          <p>Выберите период</p>
        )}
      </div>
      <button
        className={styles.clearHistoryButton}
        onClick={() => {
          const confirmed = window.confirm(
            "Вы действительно хотите очистить историю?"
          );
          if (confirmed) {
            clearHistory();
          }
        }}
      >
        Очистить историю
      </button>
    </section>
  );
};
