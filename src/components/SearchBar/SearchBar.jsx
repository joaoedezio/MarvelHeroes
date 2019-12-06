import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators as actionCreatorsCharacters } from "../../reducers/characters";
import Text from "../Text";
import styles from "./SearchBar.module.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }
  onChangeText(e) {
    const value = e.target.value;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      if (value !== "") {
        this.props.dispatch(actionCreatorsCharacters.getCharactersByName(10, 0, value));
      } else {
        this.props.dispatch(actionCreatorsCharacters.getCharactersByName(10, 0, null));
      }
    }, 400);
  }

  render() {
    return (
      <div className={styles.searchBar}>
        <Text
          type={"label"}
          color={"primary"}
        >
          {this.props.label}
        </Text>
        <input
          onChange={(e) => this.onChangeText(e)}
        />
      </div>
    )
  }

}

export default connect()(SearchBar);