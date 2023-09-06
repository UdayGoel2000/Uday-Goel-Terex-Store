import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useSnackbar } from "notistack";

const Checkout = ({ cart, setCart }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [showCartData, setShowCartData] = useState([]);
  useEffect(() => {
    showCartDataFunction();
  }, [cart]);
  useEffect(() => {
    fetchDataForCart();
  }, []);

  useEffect(() => {
    showCartDataFunction();
  }, [data]);
  const fetchDataForCart = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );

      setData(res.data);
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
        { variant: "error" }
      );
    }
  };
  const handleDelete = (id) => {
    setCart(cart.filter((ele) => ele.itemId !== Number(id)));
  };

  const showCartDataFunction = () => {
    const shoppingCartData = [...cart].map((ele) => {
      let z = data.filter((item) => item.id === ele.itemId);
      return {
        ...z[0],
        ele,

        totalCost: z[0]?.price * ele.itemQty,
      };
    });

    setShowCartData(shoppingCartData);
  };
  const handleAddToCart = (id, qty, quantity) => {
    if (qty > quantity) {
      enqueueSnackbar("exceeding the avaiable quantity", {
        variant: "warning",
      });
      return;
    }
    if (qty) {
      setCart((prevState) => {
        let found = false;
        let oldData = prevState.map((item) => {
          if (item.itemId === Number(id)) {
            found = true;
            return { ...item, itemQty: qty };
          } else return item;
        });
        if (!found) {
          return [...oldData, { itemId: Number(id), itemQty: qty }];
        } else return oldData;
      });
    } else {
      setCart((prevState) =>
        prevState.filter((item) => item.itemId !== Number(id))
      );
    }
  };
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <Navbar count={cart.reduce((a, c) => a + c.itemQty, 0)} />
      <div>
        <h1 style={{ marginLeft: "1rem" }}>Shopping Cart</h1>
        {showCartData.map((item, index) => (
          <div
            style={{
              margin: "2rem",
              display: "flex",
              width: "40vw",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={index}
          >
            <div>
              <img src={item.imageURL} alt={item.name} height="50px" />
            </div>
            <div>
              <b>
                <p>{item.name}</p>
                <p>Rs.{item.totalCost}</p>
              </b>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "1rem",
                backgroundColor: "#75dc94",
                color: "black",
                fontWeight: 600,
              }}
            >
              <button
                onClick={() =>
                  handleAddToCart(item.id, item.ele.itemQty - 1, item.quantity)
                }
              >
                -
              </button>
              <p>{item.ele.itemQty}</p>
              <button
                onClick={() =>
                  handleAddToCart(item.id, item.ele.itemQty + 1, item.quantity)
                }
              >
                +
              </button>
            </div>
            <div>
              <button
                value={item.id}
                onClick={(e) => handleDelete(e.target.value)}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  backgroundColor: isHover ? "white" : "#75dc94",
                  color: isHover ? "#75dc94" : "black",
                  fontWeight: 600,
                  border: isHover ? "1px solid #b4ecc4" : "none",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                delete
              </button>
            </div>
          </div>
        ))}
        {showCartData?.length ? (
          <>
            <hr />
            <div>
              <h2 style={{ marginLeft: "1rem" }}>
                SubTotal:{showCartData.reduce((a, c) => a + c.totalCost, 0)}
              </h2>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Checkout;
