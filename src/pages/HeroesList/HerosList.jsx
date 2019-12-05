import React, { Component } from "react";
import styles from "./HeroesList.module.scss";
import CharactersList from "../../components/CharactersList/CharactersList";
import Header from "../../components/Header";


class HeroesList extends Component {
  render() {
    return (
      <div className={styles.heroesList}>
        <Header />
        <CharactersList />
        <div className={styles.footer}>
          {"footer"}
        </div>
      </div>
    )
  }
}

export default HeroesList;