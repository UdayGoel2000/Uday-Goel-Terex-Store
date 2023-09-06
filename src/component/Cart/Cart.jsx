import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import styles from "./Cart.module.css";

const Cart = ({ count }) => {
  return (
    <div className={styles.box}>
      {!count ? (
        <ShoppingCartOutlinedIcon fontSize="medium" />
      ) : (
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={count} color="error">
            <ShoppingCartOutlinedIcon fontSize="medium" />
          </Badge>
        </IconButton>
      )}
    </div>
  );
};

export default Cart;
