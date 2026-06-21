import { ModalContextProvider } from "./Context/ModalContextProvider";
import { InputContextProvider } from "./Context/InputContextProvider";
import { OrderContextProvider } from "./Context/OrderContextProvider";
import { MainLayout } from "./Layouts/MainLayout";
import "./index.css";

function App() {
  return (
    <ModalContextProvider>
      <InputContextProvider>
        <OrderContextProvider>
          <MainLayout />
        </OrderContextProvider>
      </InputContextProvider>
    </ModalContextProvider>
  );
}

export default App;
