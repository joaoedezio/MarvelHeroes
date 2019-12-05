import React from "react";
import styles from "./CharactersList.module.scss";
import Character from "../Character";
import Text from "../Text";
import { hideOnMobile, hideOnDesktop } from "../../styles/helpers/misc.module.scss";

const characters = [
  {
    name: "Tony Stark",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit " +
      "Aenean id feugiat magna. Aliquam cursus erat lectus, lobortis blandit quam efficitur vitae. Duis ultrices suscipit venenatis. Duis eu convallis felis, ut finibus orci. Nullam ac suscipit tellus. Fusce non vehicula mauris. Mauris auctor vel nulla eu dictum."
  },
  {
    name: "Tony Stark",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit " +
      "Aenean id feugiat magna. Aliquam cursus erat lectus, lobortis blandit quam efficitur vitae. Duis ultrices suscipit venenatis. Duis eu convallis felis, ut finibus orci. Nullam ac suscipit tellus. Fusce non vehicula mauris. Mauris auctor vel nulla eu dictum."
  },
  {
    name: "Tony Stark",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit " +
      "Aenean id feugiat magna. Aliquam cursus erat lectus, lobortis blandit quam efficitur vitae. Duis ultrices suscipit venenatis. Duis eu convallis felis, ut finibus orci. Nullam ac suscipit tellus. Fusce non vehicula mauris. Mauris auctor vel nulla eu dictum."
  },
  {
    name: "Tony Stark",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit " +
      "Aenean id feugiat magna. Aliquam cursus erat lectus, lobortis blandit quam efficitur vitae. Duis ultrices suscipit venenatis. Duis eu convallis felis, ut finibus orci. Nullam ac suscipit tellus. Fusce non vehicula mauris. Mauris auctor vel nulla eu dictum."
  },
]

const CharactersList = props => {

  const renderCharacter = (item, index) => {
    return (
      <li key={index}>
        <Character character={item} />
      </li>
    )
  }

  const items = characters.map((item, index) => renderCharacter(item, index))
  return (
    <div className={styles.charactersListContainer}>
      <div className={styles.listHeader}>
        <Text
          type={"label"}
          color={"white"}
          className={`${styles.headerText} ${hideOnMobile}`}
        >
          {"Personagem"}
        </Text>
        <Text
          type={"label"}
          color={"white"}
          className={`${styles.headerText} ${hideOnMobile}`}
        >
          {"Descrição"}
        </Text>
        <Text
          type={"label"}
          color={"white"}
          className={`${styles.headerText} ${hideOnDesktop}`}
        >
          {"Nome"}
        </Text>
      </div>
      <div className={styles.charactersListScrollArea}>
        <ul className={styles.charactersList}>
          {items}
        </ul>
      </div>
    </div>
  )
}

export default CharactersList;