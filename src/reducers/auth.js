import userResource from "../resources/user";
import { actionCreators as actionCreatorsUser } from "./user";

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  LOADING_LOGIN: "LOADING_LOGIN",
  SAVE_AUTH_DATA: "SAVE_AUTH_DATA",
  CLEAR_AUTH_DATA: "CLEAR_AUTH_DATA",
  LOADING_AUTH_DATA: "LOADING_AUTH_DATA",
  SET_UNIQUE_ID: "SET_UNIQUE_ID",
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  login: (email, password) => async dispatch => {
    dispatch({ type: types.LOADING_LOGIN });
    let response = await userResource.login(email, password);
    if (response && response.data.success) {
      const idUser = response.data.id_user;
      const token = response.data.token;
      if (idUser && token) {
        // eslint-disable-next-line no-undef
        localStorage.setItem("id_user", idUser);
        // eslint-disable-next-line no-undef
        localStorage.setItem("token", token);
        dispatch({ type: types.SAVE_AUTH_DATA, payload: response.data });
      }
    }
  },
  initialLoad: () => async (dispatch, getState) => {
    dispatch({ type: types.LOADING_AUTH_DATA });
    let token = getState().authReducer.authData
      ? getState().authReducer.authData.token
      : null;
    let idUser = getState().authReducer.authData
      ? getState().authReducer.authData.idUser
      : null;
    if (!token || !idUser) {
      // eslint-disable-next-line no-undef
      idUser = localStorage.getItem("id_user");
      // eslint-disable-next-line no-undef
      token = localStorage.getItem("token");
    }
    let response = await userResource.initialLoad(token);
    dispatch({
      type: types.SAVE_AUTH_DATA,
      payload: { id_user: idUser, token },
    });
    dispatch(actionCreatorsUser.setUserData(response.data.user));
    console.log(response);
  },

  logout: () => dispatch => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem("id_user");
    // eslint-disable-next-line no-undef
    localStorage.removeItem("token");

    dispatch(actionCreators.clearData());
  },

  clearData: () => dispatch => {
    dispatch({ type: types.CLEAR_AUTH_DATA });
  },
};

// Initial state of the store
const initialState = {
  isLogged: false,
  authData: null,
  loadingLogin: false,
  loadedData: false,
  loadingData: false,
  uniqueId: null,
  loginError: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SAVE_AUTH_DATA: {
      if (payload.error) {
        return {
          ...state,
          loadingLogin: false,
          loginError: payload.error,
        };
      }
      return {
        ...state,
        isLogged: true,
        authData: payload,
        loadingData: false,
        loadingLogin: false,
        loadedData: true,
      };
    }

    case types.LOADING_LOGIN: {
      return {
        ...state,
        loadingLogin: true,
      };
    }
    case types.LOADING_AUTH_DATA: {
      return {
        ...state,
        loadingData: true,
      };
    }
    case types.CLEAR_AUTH_DATA: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
