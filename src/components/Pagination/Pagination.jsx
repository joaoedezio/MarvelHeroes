import React, { Component } from "react";
import { connect } from "react-redux";

import Text from "../Text";
import { actionCreators as actionCreatorsCharacters } from "../../reducers/characters";


import styles from "./Pagination.module.scss";
import { hideOnMobile } from "../../styles/helpers/misc.module.scss";

const mapStateToProps = store => ({
  offset: store.charactersReducer.offset,
  limit: store.charactersReducer.limit,
  total: store.charactersReducer.total,
  loadingData: store.charactersReducer.loadingData,
});


class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: 0,
      totalPages: null,
    };
  }

  componentDidMount() {
    this.createPageItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.createPageItems();
      this.props.dispatch(actionCreatorsCharacters.getCharacters(10, 10 * this.state.currentPage));
    }
    if (!this.props.loadingData && prevProps.loadingData && this.props.total > 0) {
      this.createPageItems();
    }
  }

  createPageItems() {
    const { limit, total } = this.props;
    const { currentPage } = this.state;
    const totalPages = parseInt((total / limit).toFixed()) - limit;
    let pages = [];
    pages.push({ index: 0, label: 1 });
    if (currentPage > 2 && currentPage <= totalPages - 2) {
      for (let i = 2; i > 0; i--) {
        let index = currentPage - i;
        let label = index + 1;
        let page = { index, label }
        pages.push(page);
      }
      pages.push({ index: currentPage, label: currentPage + 1 });
      pages.push({ index: currentPage + 1, label: currentPage + 2 });
    }
    else if (currentPage > totalPages - 2 && currentPage !== totalPages) {
      for (let i = 3; i > 0; i--) {
        let index = currentPage - i;
        let label = index + 1;
        let page = { index, label }
        pages.push(page);
      }
      pages.push({ index: currentPage, label: currentPage + 1 });
      currentPage + 1 !== totalPages && pages.push({ index: currentPage + 1, label: currentPage + 2 });

    } else if (currentPage === totalPages) {
      for (let i = 4; i > 0; i--) {
        let index = currentPage - i;
        let label = index + 1;
        let page = { index, label }
        pages.push(page);
      }
    }
    else {
      for (let i = 1; i < 5; i++) {
        let index = i;
        let label = index + 1;
        let page = { index, label }
        pages.push(page);
      }
    }
    pages.push({ index: totalPages, label: totalPages + 1 });

    this.setState({
      pages,
      currentPage,
      totalPages
    });
  }

  onPageClick(page) {
    if (page !== this.state.currentPage) {
      this.setState({ currentPage: page });
    }
  }

  onPrevButtonClick() {
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  }

  onNextButtonClick() {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  }

  renderPage(item) {
    const { index, label } = item;
    const { totalPages, currentPage } = this.state;
    const active = index === currentPage;
    return (
      <div
        className={
          `${styles.pageIndicator}
          ${active ? styles.activePage : ""}
          ${!active && index > 1 && index < totalPages - 1 && ((currentPage < 1 || currentPage >= totalPages - 1) || (currentPage >= 1 && currentPage < totalPages - 1)) ? hideOnMobile : ""}`
        }
        key={index}
        onClick={() => this.onPageClick(index)}
      >
        <Text
          color={active ? "white" : "primary"}
        >
          {label}
        </Text>
      </div>)
  }

  render() {
    const pages = this.state.pages.map((item) => this.renderPage(item));
    return (
      <div className={styles.paginationContainer}>
        <button
          className={this.state.currentPage === 0 ? styles.disabledButton : ""}
          onClick={() => this.onPrevButtonClick()}
        >
          <i className={"icon-play"} />
        </button>
        <div className={styles.pagination}>
          {pages}
        </div>
        <button
          className={this.state.currentPage === this.state.totalPages ? styles.disabledButton : ""}
          onClick={() => this.onNextButtonClick()}
        >
          <i className={"icon-play"} />
        </button>
      </div>
    );
  }
};

export default connect(mapStateToProps)(Pagination);