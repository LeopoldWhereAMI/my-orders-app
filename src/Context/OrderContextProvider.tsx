import { useContext, useEffect, useState } from "react";
import { OrderContext, type Order } from "./OrderContext";
import { InputContext } from "./InputContext";
import { ModalContext } from "./ModalContext";
import type { ProviderProps } from "../types/contextTypes";

export const OrderContextProvider = ({ children }: ProviderProps) => {
  const { setModalActive } = useContext(ModalContext);
  const { orderCount, setOrderCount, toolName, setToolName } =
    useContext(InputContext);

  // Загружаем заказы из localStorage при старте
  const [orders, setOrders] = useState<Order[]>(() => {
    const storeOrders = localStorage.getItem("orders");
    return storeOrders ? JSON.parse(storeOrders) : [];
  });

  const [ordersHistory, setOrdersHistory] = useState<Order[]>(() => {
    const storedHistory = localStorage.getItem("ordersHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  // Сохраняем заказы в localStorage при каждом изменении массива
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("ordersHistory", JSON.stringify(ordersHistory));
  }, [orders, ordersHistory]);

  const addOrder = () => {
    if (!orderCount || !toolName) return;

    const now = new Date();
    const newOrder = {
      id: Date.now(),
      orderCount,
      toolName,
      date: now.toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    setOrdersHistory((prev) => [...prev, newOrder]);

    setModalActive(null);
    setOrderCount("");
    setToolName("");
  };

  const clearHistory = () => {
    setOrdersHistory([]);
  };

  // Удаление заказа
  const deleteOrder = (orderId: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        ordersHistory,
        addOrder,
        deleteOrder,
        clearHistory,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
