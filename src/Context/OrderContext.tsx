import { createContext, type Dispatch, type SetStateAction } from "react";

export type Order = {
  id: number;
  orderCount: string;
  toolName: string;
  date: string;
};

type OrderContextProps = {
  orders: Order[];
  ordersHistory: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  addOrder: () => void;
  deleteOrder: (value: number) => void;
  clearHistory: () => void;
};

export const OrderContext = createContext<OrderContextProps>({
  orders: [],
  ordersHistory: [],
  setOrders: () => {},
  addOrder: () => {},
  deleteOrder: () => {},
  clearHistory: () => {},
});
