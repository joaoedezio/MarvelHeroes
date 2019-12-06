import requestUtils from "./request";

export default {
  getMediaCharacter(idCharacter) {
    return requestUtils({
      url: `edge/characters/${idCharacter}/media-characters`,
      method: "GET",
    });
  },

  getMedia(idMedia) {
    return requestUtils({
      url: `edge/media-characters/${idMedia}/media`,
      method: "GET",
    });
  },
};
