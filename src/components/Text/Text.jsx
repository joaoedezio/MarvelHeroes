import React from "react";
import textTypes from "./Text.module.scss";
import colors from "../../styles/helpers/_colors.scss";

const Text = ({ type, color, styles, className, children }) => {
  const _styles = {
    color: colors[color],
    ...styles,
  }
  return (
    <span
      style={_styles}
      className={`${textTypes[type]} ${className}`}
    >
      {children}
    </span>
  )
}

Text.defaultProps = {
  className: "",
  styles: {},
  type: "text"
};

export default Text;