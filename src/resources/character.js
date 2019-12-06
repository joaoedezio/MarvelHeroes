import requestUtils from "./request";

export default {
  getCharacters(limit, offset, name) {
    let url = `edge/characters?page[limit]=${limit}&page[offset]=${offset}`;
    if (name) {
      url = `edge/characters?filter[name]=${name}&page[limit]=${limit}&page[offset]=${offset}`;
    }
    return requestUtils({
      url,
      method: "GET",
    });
  },
  getCharacter(characterId) {
    return requestUtils({
      url: `edge/characters/${characterId}`,
      method: "GET",
    });
  },
};
