// The types of actions that you can dispatch to modify the state of the store
export const types = {
  LOADING_USER_DATA: "LOADING_USER_DATA",
  SAVE_USER_DATA: "SAVE_USER_DATA",
  CLEAR_USER_DATA: "CLEAR_USER_DATA",
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  setUserData: data => dispatch => {
    dispatch({ type: types.LOADING_USER_DATA });
    console.log("setUserData ", data);
    dispatch({ type: types.SAVE_USER_DATA, payload: data });
  },
  clearData: () => dispatch => {
    dispatch({ type: types.CLEAR_USER_DATA });
  },
};

// Initial state of the store
const initialState = {
  userData: null,
  loadedData: false,
  loadingData: false,
  userDataError: null,
};

export default function user(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SAVE_USER_DATA: {
      if (payload.error) {
        return {
          ...state,
          userDataError: payload.error,
        };
      }
      return {
        ...state,
        userData: payload,
        loadingData: false,
        loadedData: true,
      };
    }

    case types.LOADING_USER_DATA: {
      return {
        ...state,
        loadingData: true,
      };
    }
    case types.CLEAR_USER_DATA: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
