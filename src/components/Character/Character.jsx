import React from "react";
import Text from "../Text";
import styles from "./Character.module.scss"
import { hideOnMobile } from "../../styles/helpers/misc.module.scss";
import Image from "../Image";

const Character = props => {
  return (
    <div
      className={styles.character} title={`Ver detalhes de ${props.character.name}`}
      onClick={() => props.onClick()}
    >
      <div>
        <Image
          className={styles.avatar}
          src={props.character.avatar}
        />
        <Text>
          {props.character.name}
        </Text>
      </div>
      <Text
        className={hideOnMobile}
      >
        {props.character.description || "Sem descrição"}
      </Text>
    </div>
  )
}

export default Character;