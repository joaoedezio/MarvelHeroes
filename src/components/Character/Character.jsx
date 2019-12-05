import React from "react";
import Text from "../Text";
import styles from "./Character.module.scss"
import { hideOnMobile } from "../../styles/helpers/misc.module.scss";
import Image from "../Image";

const Character = props => {
  return (
    <div className={styles.character}>
      <div>
        <Image
          className={styles.avatar}
        />
        <Text>
          {props.character.name}
        </Text>
      </div>
      <Text
        className={hideOnMobile}
      >
        {props.character.description}
      </Text>
    </div>
  )
}

export default Character;