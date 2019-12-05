import React from "react";
import styles from "./Header.module.scss"
import { hideOnMobile, hideOnDesktop } from "../../styles/helpers/misc.module.scss";
import Text from "../Text";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <div>
          <Text
            className={`${styles.title} ${hideOnMobile}`}
            type={"titleBold"}
            color={"primary"}
          >
            {"BUSCA KITSU"}
          </Text>
          <Text
            className={hideOnMobile}
            type={"title"}
            color={"primary"}
          >
            {"TESTE FRONT-END"}
          </Text>
          <Text
            className={`${styles.title} ${hideOnDesktop}`}
            styles={{ fontSize: 16 }}
            type={"titleBold"}
            color={"primary"}
          >
            {"BUSCA KITSU"}
          </Text>
          <Text
            className={hideOnDesktop}
            styles={{ fontSize: 16 }}
            type={"title"}
            color={"primary"}
          >
            {"TESTE FRONT-END"}
          </Text>
        </div>
        <Text
          className={hideOnMobile}
          type={"title"}
          color={"primary"}
        >
          {"JOÃO MAIORCHINI"}
        </Text>
      </div>
      <SearchBar
        label={"Nome do Personagem"}
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  )
}

export default Header;