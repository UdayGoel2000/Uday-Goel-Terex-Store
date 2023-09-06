import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Cards from "../Card/Card";
import { useSnackbar } from "notistack";

const ProductCard = ({
  setCart,
  cart,
  searchText,
  colors,
  types,
  genders,
  prices,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [filterData, setFilterData] = useState([]);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );

      setData(res.data);
      setFilterData(res.data);
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
        { variant: "error" }
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterData(data);

    filterFunction(searchText.toLowerCase(), colors, types, prices, genders);
  }, [searchText, colors, types, prices, genders]);

  const filterFunction = (filter, colors, types, prices, genders) => {
    let newData = [...data];
    if (filter.length) {
      newData = newData.filter(
        ({ name, color, type }) =>
          name.toLowerCase().includes(filter) ||
          color.toLowerCase().includes(filter) ||
          type.toLowerCase().includes(filter)
      );
    }

    if (colors.length) {
      newData = newData.filter((item) => colors.includes(item.color));
    }
    if (genders.length) {
      newData = newData.filter((item) => genders.includes(item.gender));
    }
    if (types.length) {
      newData = newData.filter((item) => types.includes(item.type));
    }
    if (prices.length) {
      newData = newData.filter((item) => {
        let found = false;

        prices.forEach((range) => {
          let low = Math.log(0);
          let high = 1 / 0;
          if (!range.includes("-")) {
            low = Number(range);
          } else {
            low = range.split("-")[0];
            high = range.split("-")[1];
          }
          if (
            Number(item.price) >= Number(low) &&
            Number(item.price) <= Number(high)
          ) {
            found = true;
          }
        });

        return found;
      });
    }
    setFilterData(newData);
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

  return (
    <Grid container spacing={2} sx={{ margin: "1rem" }}>
      {filterData.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Cards
            data={item}
            handleAddToCart={(id, qty, quantity) => {
              handleAddToCart(id, qty, quantity);
            }}
            cart={cart}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCard;
