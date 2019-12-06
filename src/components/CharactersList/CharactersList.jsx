import React from "react";
import styles from "./CharactersList.module.scss";
import Character from "../Character";
import Text from "../Text";
import { hideOnMobile, hideOnDesktop } from "../../styles/helpers/misc.module.scss";
const CharactersList = props => {

  const formatText = (text) => {
    return text.replace(/<[^>]*>/g, '');
  }

  const renderCharacter = (item, index) => {
    const description = formatText(item.attributes.description);
    let character = {
      avatar: item.attributes.image && item.attributes.image.original,
      name: item.attributes.name,
      description: description.length > 300 ? description.slice(0, 300) + "..." : description,
    }

    return (
      <li key={index}>
        <Character
          onClick={() => props.onCharacterClick(item)}
          character={character}
        />
      </li>
    )
  }
  console.log(props.characters)
  const items = props.characters.map((item, index) => renderCharacter(item, index))
  return (
    <div className={styles.charactersListContainer}>
      {props.characters.length > 0 &&
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
        </div>}
      {props.characters.length === 0 &&
        <Text>
          {"Nenhum personagem retornado"}
        </Text>}
      <div className={styles.charactersListScrollArea}>
        <ul className={styles.charactersList}>
          {items}
        </ul>
      </div>
    </div>
  )
}

CharactersList.defaultProps = {
  characters: []
}

export default CharactersList;