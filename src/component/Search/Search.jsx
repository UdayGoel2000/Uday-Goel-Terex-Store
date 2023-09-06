import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "./Search.module.css";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";

export default function Search({
  searchText,
  setSearchText,
  style,
  changeFilterStyle,
}) {
  return (
    <div className={styles.wrapper}>
      <TextField
        label="Search for products..."
        color="success"
        variant="standard"
        sx={{ width: "20rem" }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <div className={styles.searchicon}>
        <SearchOutlinedIcon fontSize="large" sx={{ margin: 0, padding: 0 }} />
      </div>
      <div className={styles.filterIcon}>
        <FilterAltOutlinedIcon
          fontSize="large"
          sx={{ margin: 0, padding: 0 }}
          onClick={changeFilterStyle}
        />
      </div>
    </div>
  );
}
