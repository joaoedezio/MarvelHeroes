import characterResource from "../resources/character";

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  SAVE_CHARACTERS_DATA: "SAVE_CHARACTERS_DATA",
  CLEAR_CHARACTERS_DATA: "CLEAR_CHARACTERS_DATA",
  START_SEARCH: "START_SEARCH",
  LOADING_CHARACTERS_DATA: "LOADING_CHARACTERS_DATA",
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  getCharactersByName: (limit = 10, offset = 0, name) => async dispatch => {
    dispatch({ type: types.START_SEARCH, payload: name });
    dispatch(actionCreators.getCharacters(limit, offset, name))
  },
  getCharacters: (limit = 10, offset = 0, name = null) => async (dispatch, getState) => {
    name = !name ? getState().charactersReducer.name : name;
    console.log(name);
    dispatch({ type: types.LOADING_CHARACTERS_DATA });
    let response = await characterResource.getCharacters(limit, offset, name);
    console.log(response);
    dispatch({ type: types.SAVE_CHARACTERS_DATA, payload: { characters: response.data.data, total: response.data.meta.count, offset, limit } });
  },

  clearData: () => dispatch => {
    dispatch({ type: types.CLEAR_CHARACTERS_DATA });
  },
};

// Initial state of the store
const initialState = {
  characters: [],
  total: null,
  name: null,
  offset: 0,
  limit: 10,
  loadedData: false,
  loadingData: false,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SAVE_CHARACTERS_DATA: {
      return {
        ...state,
        characters: payload.characters,
        total: payload.total,
        offset: payload.offset,
        limit: payload.limit,
        loadedData: true,
        loadingData: false,
      };
    }
    case types.LOADING_CHARACTERS_DATA: {
      return {
        ...state,
        loadingData: true,
      };
    }
    case types.START_SEARCH: {
      return {
        ...state,
        characters: [],
        total: null,
        offset: 0,
        limit: 10,
        name: payload,
      };
    }
    case types.CLEAR_CHARACTERS_DATA: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
