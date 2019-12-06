import React from "react";

import { progressIndicator } from "./ProgressIndicator.module.scss";

import colors from "../../styles/helpers/_colors.scss";

const ProgressIndicator = props => {
  const color = colors[props.color];
  return <div className={progressIndicator} style={{ borderColor: color }} />;
};

ProgressIndicator.defaultProps = {
  color: "primary",
};

export default ProgressIndicator;
