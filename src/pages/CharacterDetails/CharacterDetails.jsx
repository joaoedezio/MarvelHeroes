import React, { Component } from "react";
import { connect } from "react-redux";
import mediaResource from "../../resources/media";
import characterResource from "../../resources/character";
import Backdrop from "../../components/Backdrop";
import Text from "../../components/Text";
import Image from "../../components/Image";
import ProgressIndicator from "../../components/ProgressIndicator";
import styles from "./CharacterDetails.module.scss";

const mapStateToProps = store => ({
  characters: store.charactersReducer.characters,
  loadedData: store.charactersReducer.loadedData,
})

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      medias: [],
      loading: true,
    };
    this.idCharacter = null;
  }
  componentDidMount() {
    this.idCharacter = this.props.match.params.idCharacter;
    if (this.props.loadedData) {
      this.getCharacter();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loadedData && !prevProps.loadedData) {
      this.getCharacter();
    }
  }

  async loadCharacterInfo() {
    let response = await mediaResource.getMediaCharacter(this.idCharacter);
    console.log(response);
    let mediasCharacter = response.data.data;
    let medias = [];
    console.log(mediasCharacter);
    mediasCharacter.forEach(async mc => {
      response = await mediaResource.getMedia(mc.id);
      this.setState({
        medias: [
          ...this.state.medias,
          response.data.data
        ]
      })
      // medias.push(response.data.data);
    });

    console.log(medias);
    this.setState({
      // medias,
      loading: false
    });

  }

  formatText(text) {
    return text.replace(/<[^>]*>/g, '');
  }

  async getCharacter() {
    let character = this.props.characters.filter(char => char.id === this.idCharacter)[0];
    console.log(character);
    if (!character) {
      let response = await characterResource.getCharacter(this.idCharacter);
      character = response.data.data;
    }
    this.setState({ character });
    this.loadCharacterInfo();
  }

  renderMediaItem(item) {
    const { attributes } = item;
    return (
      <div
        key={item.id}
        className={styles.media}
      >
        <div>
          <Image
            className={styles.mediaCoverImage}
            src={attributes.coverImage && attributes.coverImage.small}
          />
          <Text>{attributes.canonicalTitle}</Text>
        </div>
      </div>
    );
  }

  render() {
    const { character } = this.state;
    const medias = this.state.medias.map(item => this.renderMediaItem(item));
    return (
      <Backdrop>
        <div className={styles.characterDetails}>
          <div className={styles.header}>
            <Text
              type={"titleBold"}
              className={styles.title}
              color={"secondary"}
            >
              {character && character.attributes.name}
            </Text>
            <button
              className={styles.closeButton}
              onClick={() => this.props.history.goBack()}
            >
              <i className={"icon-times-solid"} />
            </button>
          </div>
          {!this.state.loading && character ?
            <div className={styles.content}>
              <div className={styles.basicInfo}>
                <Image
                  src={character.attributes.image && character.attributes.image.original}
                  className={styles.characterImage}
                />
                <div className={styles.descriptionContainer}>
                  <Text>
                    {"Biografia"}
                  </Text>
                  <Text
                    type={"label"}
                  >
                    {this.formatText(character.attributes.description || "Sem descrição")}
                  </Text>
                </div>
              </div>
              <div className={styles.mediaInfo}>
                <Text
                  type={"title"}
                  styles={{ fontSize: "24px", lineHeight: "26px" }}
                >
                  {"Aparece em:"}
                </Text>
                <div className={styles.scrollArea}>
                  <div className={styles.mediasContainer}>
                    {medias}
                  </div>
                </div>
              </div>
            </div> :
            <div className={styles.loadingContainer}>
              <ProgressIndicator />
            </div>}
        </div>
      </Backdrop>
    )
  }
}

export default connect(mapStateToProps)(CharacterDetails);