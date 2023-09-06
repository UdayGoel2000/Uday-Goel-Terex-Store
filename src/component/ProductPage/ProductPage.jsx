import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import ProductCard from "../ProductsCard/ProductCard";
import styles from "./ProductPage.module.css";
import SideBar from "../Sidebar/SideBar";

const ProductPage = ({ setCart, cart }) => {
  const [searchText, setSearchText] = useState("");
  const [style, setStyle] = useState(false);
  const [genders, setGenders] = useState([]);
  const [colors, setColors] = useState([]);
  const [prices, setPrices] = useState([]);
  const [types, setTypes] = useState([]);

  const changeFilterStyle = () => {
    setStyle(!style);
  };

  const handleGender = (e) => {
    e.target.checked
      ? setGenders((prevState) => [...prevState, e.target.value])
      : setGenders((prevState) =>
          prevState.filter((item) => item !== e.target.value)
        );
  };
  const handleColor = (e) => {
    e.target.checked
      ? setColors((prevState) => [...prevState, e.target.value])
      : setColors((prevState) =>
          prevState.filter((item) => item !== e.target.value)
        );
  };
  const handlePriceRange = (e) => {
    e.target.checked
      ? setPrices((prevState) => [...prevState, e.target.value])
      : setPrices((prevState) =>
          prevState.filter((item) => item !== e.target.value)
        );
  };
  const handleType = (e) => {
    e.target.checked
      ? setTypes((prevState) => [...prevState, e.target.value])
      : setTypes((prevState) =>
          prevState.filter((item) => item !== e.target.value)
        );
  };

  return (
    <>
      <Navbar count={cart.reduce((a, c) => a + c.itemQty, 0)} />
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        style={style}
        changeFilterStyle={changeFilterStyle}
      />
      <div className={styles.bodysection}>
        <SideBar
          colors={colors}
          types={types}
          genders={genders}
          prices={prices}
          style={style}
          handleColor={handleColor}
          handleType={handleType}
          handleGender={handleGender}
          handlePriceRange={handlePriceRange}
        />
        <ProductCard
          setCart={setCart}
          cart={cart}
          searchText={searchText}
          colors={colors}
          types={types}
          genders={genders}
          prices={prices}
        />
      </div>
    </>
  );
};

export default ProductPage;
