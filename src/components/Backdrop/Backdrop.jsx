import React, { Component } from "react";
import ReactDOM from "react-dom";

import styles from "./Backdrop.module.scss";

const modalRoot = document.getElementById("modal");

class Backdrop extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        ref={el => (this.container = el)}
        className={`${styles.container} ${this.props.className}`}
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </div>,
      this.el
    );
  }
}

Backdrop.defaultProps = {
  className: "",
  onClick: () => {},
};

export default Backdrop;
