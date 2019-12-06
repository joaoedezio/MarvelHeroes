import React, { Component } from "react";

import { createBrowserHistory } from "history";

import Characters from "../../pages/Characters";

import styles from "./Root.module.scss";

const history = createBrowserHistory();

class Root extends Component {

  componentDidMount() {
    if (this.container) {
      const vh = window.innerHeight * 0.01;
      this.container.style.setProperty("--vh", `${vh}px`);
    }
    window.onresize = () => {
      if (this.container) {
        const vh = window.innerHeight * 0.01;
        this.container.style.setProperty("--vh", `${vh}px`);
      }
    };
  }

  startSession() {
    // eslint-disable-next-line no-undef
    const idUser = localStorage.getItem("id_user");
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem("token");
    return idUser && token;
  }

  render() {
    return (
      <div
        className={styles.rootContainer}
        ref={el => {
          this.container = el;
        }}
      >
        <Characters
          history={history}
        />
      </div>
    );
  }
}

export default Root;
