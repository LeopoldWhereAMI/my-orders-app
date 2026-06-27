import { useContext, useState } from "react";
import { OrderContext } from "../../Context/OrderContext";
import headerImg from "../../assets/header-img.png";
import styles from "./Header.module.css";

type HeaderProps = {
  setActive: (value: string | null) => void;
};

export const Header = ({ setActive }: HeaderProps) => {
  const [showText, setShowText] = useState(false);
  const { orders } = useContext(OrderContext);

  const handleClick = () => {
    setShowText(!showText);
  };

  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.imageWrapper}>
        <img
          onClick={handleClick}
          className={styles.headerImage}
          src={headerImg}
          alt="header-img"
          title="Кликни, что бы увидеть кол-во заказов"
          data-testid="header-image"
        />
        {showText && (
          <div className={styles.showText}>
            У тебя <span>{orders.length} </span> срочных заказов
          </div>
        )}
      </div>

      <h1>Срочные заказы</h1>

      <nav>
        <button
          className={styles.addOrderBtn}
          onClick={() => setActive("addOrder")}
          data-testid="add-order-button"
        >
          Добавить заказ
        </button>
        <button
          className={styles.historyBtn}
          onClick={() => setActive("dashboard")}
        >
          История заказов
        </button>
      </nav>
    </header>
  );
};
