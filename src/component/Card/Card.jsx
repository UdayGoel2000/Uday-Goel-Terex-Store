import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Cards = ({ data, handleAddToCart, cart }) => {
  const { imageURL, id, name, price, quantity } = data;

  const AddToCartButton = ({ id, handleAddToCart, quantity }) => {
    return (
      <Button
        value={id}
        onClick={(e) => handleAddToCart(e.target.value, 1, quantity)}
        size="small"
        sx={{
          backgroundColor: "#75dc94",
          color: "black",
          fontWeight: 600,
          ":hover": {
            backgroundColor: "white",
            border: "1px solid #b4ecc4",
            color: "#75dc94",
          },
        }}
      >
        Add To Cart
      </Button>
    );
  };

  const QtyHandler = ({ id, qty, handleAddToCart, quantity }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "#75dc94",
          color: "black",
          fontWeight: 600,
        }}
      >
        <button onClick={() => handleAddToCart(id, qty - 1, quantity)}>
          -
        </button>
        <Typography>{qty}</Typography>
        <button onClick={() => handleAddToCart(id, qty + 1, quantity)}>
          +
        </button>
      </Box>
    );
  };
  return (
    <Card sx={{ maxWidth: 250, border: "1px solid #b4ecc4" }}>
      <CardContent sx={{ position: "absolute", padding: "1.25rem" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontSize: "1rem",
            fontWeight: 800,
            backgroundColor: " black",
            color: "white",
            padding: "0.15rem",
          }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 150, margin: "1rem", marginBottom: 0 }}
        image={imageURL}
        title="green iguana"
      />

      <CardActions sx={{ justifyContent: "space-between", margin: "0 0.5rem" }}>
        <Typography size="small" sx={{ fontWeight: 600 }}>
          RS {price}
        </Typography>
        {quantity ? (
          cart.map((element) => Number(element.itemId)).includes(Number(id)) ? (
            <QtyHandler
              id={id}
              quantity={quantity}
              qty={
                [...cart].filter((ele) => {
                  if (ele.itemId === Number(id)) return Number(ele.itemQty);
                })[0].itemQty
              }
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <AddToCartButton
              id={id}
              handleAddToCart={handleAddToCart}
              quantity={quantity}
            />
          )
        ) : (
          <Box>
            <Button
              variant="disabled"
              sx={{ backgroundColor: "grey", color: "black" }}
            >
              Out Of Stock
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default Cards;
