import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router";
import CharactersList from "../../components/CharactersList/CharactersList";
import { actionCreators as actionCreatorsCharacters } from "../../reducers/characters";
import Header from "../../components/Header";
import ProgressIndicator from "../../components/ProgressIndicator";

import Pagination from "../../components/Pagination";

import styles from "./Characters.module.scss";
import CharacterDetails from "../CharacterDetails";

const mapStateToProps = store => ({
  characters: store.charactersReducer.characters,
  loadedData: store.charactersReducer.loadedData,
  loadingData: store.charactersReducer.loadingData,
});

class Characters extends Component {

  componentDidMount() {
    this.props.dispatch(actionCreatorsCharacters.getCharacters());
  }

  onCharacterClick(character) {
    this.props.history.push(character.id);
  }

  render() {
    return (
      <div className={styles.characters}>
        <Header />
        {this.props.loadedData &&
          <>
            {!this.props.loadingData &&
              <CharactersList
                characters={this.props.characters}
                onCharacterClick={(character) => this.onCharacterClick(character)}
              />}
            <div className={styles.footer}>
              {this.props.characters && this.props.characters.length > 1 &&
                <Pagination />}
            </div>
          </>}
        {this.props.loadingData &&
          <div className={styles.loadingCharacters} >
            <ProgressIndicator />
          </div>}
        <Router history={this.props.history}>
          <Route
            path={`/:idCharacter`}
            component={CharacterDetails}
          />
        </Router>

      </div>
    )
  }
}

export default connect(mapStateToProps)(Characters);