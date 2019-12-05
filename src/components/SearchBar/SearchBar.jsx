import React from "react";
import Text from "../Text";
import styles from "./SearchBar.module.scss";

const SearchBar = props => {
  return (
    <div className={styles.searchBar}>
      <Text
        type={"label"}
        color={"primary"}
      >
        {props.label}
      </Text>
      <input
        onChange={props.onChange}
      />
    </div>
  )
}

export default SearchBar;