import ProductPage from "./component/ProductPage/ProductPage";
import { Routes, Route } from "react-router-dom";
import Checkout from "./component/Checkout/Checkout";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<ProductPage setCart={setCart} cart={cart} />}
        />
        <Route
          exact
          path="/checkout"
          element={<Checkout setCart={setCart} cart={cart} />}
        />
      </Routes>
    </>
  );
}

export default App;
