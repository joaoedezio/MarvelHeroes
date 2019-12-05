import proposalResource from "../resources/proposal";

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  LOADING_PROPOSAL: "LOADING_PROPOSAL",
  SAVE_QUOTA_ID: "SAVE_QUOTA_ID",
  SAVE_CLIENT_ID: "SAVE_CLIENT_ID",
  SAVE_PROPOSAL_DATA: "SAVE_PROPOSAL_DATA",
  CLEAR_PROPOSAL_DATA: "CLEAR_PROPOSAL_DATA",
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  setQuotaId: quotaId => dispatch => {
    dispatch({ type: types.SAVE_QUOTA_ID, payload: quotaId });
  },
  setClientId: clientId => dispatch => {
    dispatch({ type: types.SAVE_CLIENT_ID, payload: clientId });
  },
  createProposal: () => async (dispatch, getState) => {
    dispatch({ type: types.LOADING_PROPOSAL, payload: true });
    const token = getState().authReducer.authData && getState().authReducer.authData.token;
    let response = await proposalResource.createProposal(
      getState().proposalReducer.quotaId,
      getState().proposalReducer.clientId,
      token
    );
    console.log(response);
    dispatch({ type: types.SAVE_PROPOSAL_DATA, payload: response.data });
    dispatch({ type: types.LOADING_PROPOSAL, payload: false });
  },
  clearData: () => dispatch => {
    dispatch({ type: types.CLEAR_PROPOSAL_DATA });
  },
};

// Initial state of the store
const initialState = {
  quotaId: null,
  clientId: null,
  proposalData: null,
  loadingProposal: false,
};

export default function proposal(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SAVE_QUOTA_ID: {
      return {
        ...state,
        quotaId: payload,
      };
    }
    case types.SAVE_CLIENT_ID: {
      return {
        ...state,
        clientId: payload,
      };
    }
    case types.SAVE_PROPOSAL_DATA: {
      return {
        ...state,
        proposalData: payload,
      };
    }
    case types.LOADING_PROPOSAL: {
      return {
        ...state,
        loadingProposal: payload,
      };
    }
    case types.CLEAR_PROPOSAL_DATA: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
