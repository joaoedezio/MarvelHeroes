import React from "react";

const Image = (props) => {
  const _style = {
    ...props.style,
    objectFit: "cover"
  }
  return (
    <img
      src={props.src}
      className={props.className}
      style={_style}
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
