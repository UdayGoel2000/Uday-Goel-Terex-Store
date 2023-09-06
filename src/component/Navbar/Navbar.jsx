import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";

const Navbar = ({ count }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.subWrapper}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <p className={styles.product}>Products</p>
          </Link>
          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Cart count={count} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
