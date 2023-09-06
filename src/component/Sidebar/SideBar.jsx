import React from "react";
import styles from "./SideBar.module.css";
import Checkbox from "@mui/material/Checkbox";
const genderArray = ["Men", "Women"];
const priceArray = ["0-250", "251-450", "450"];
const typeArray = ["Polo", "Hoodie", "Basic"];
const colorArray = ["Red", "Blue", "Green"];
const SideBar = ({
  colors,
  types,
  genders,
  prices,
  style,
  handleColor,
  handleType,
  handleGender,
  handlePriceRange,
}) => {
  const filterSection = (
    <div className={styles.subBox}>
      <p className={styles.headings}>Colour</p>
      <ul>
        {colorArray.map((item, index) => (
          <li key={index}>
            <Checkbox
              value={item}
              checked={colors.includes(item)}
              onChange={(e) => {
                handleColor(e);
              }}
            />
            {item}
          </li>
        ))}
      </ul>
      <p className={styles.headings}>Gender</p>
      <ul>
        {genderArray.map((item, index) => (
          <li key={index}>
            <Checkbox
              value={item}
              checked={genders.includes(item)}
              onChange={(e) => {
                handleGender(e);
              }}
            />
            {item}
          </li>
        ))}
      </ul>
      <p className={styles.headings}>Price</p>
      <ul>
        {priceArray.map((item, index) => (
          <li key={index}>
            <Checkbox
              value={item}
              checked={prices.includes(item)}
              onChange={(e) => {
                handlePriceRange(e);
              }}
            />
            {item}
          </li>
        ))}
      </ul>
      <p className={styles.headings}>Type</p>
      <ul>
        {typeArray.map((item, index) => (
          <li key={index}>
            <Checkbox
              value={item}
              checked={types.includes(item)}
              onChange={(e) => {
                handleType(e);
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      <div className={styles.box}>{filterSection}</div>
      <div className={styles.box1}>{!style ? "" : filterSection}</div>
    </>
  );
};

export default SideBar;
