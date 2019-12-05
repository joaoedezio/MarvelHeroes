import React from "react";

const Image = (props) => {
  return (
    <img
      src={props.src}
      className={props.className}
      style={props.style}
      alt={props.alt}
      onClick={props.onClick}
    />
  );
};

Image.defaultProps = {
  className: "",
  style: {},
  alt: "",
  onClick: () => { },
};

export default Image;
