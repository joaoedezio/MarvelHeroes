import simulationResource from "../resources/simulation";

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  SAVE_SEGMENTS_DATA: "SAVE_SEGMENTS_DATA",
  CLEAR_SIMULATION_DATA: "CLEAR_SIMULATION_DATA",
  SAVE_QUOTAS_DATA: "SAVE_QUOTAS_DATA",
  SAVE_SELECTED_QUOTA: "SAVE_SELECTED_QUOTA",
  LOADING_QUOTAS: "LOADING_QUOTAS",
  LOADING_QUOTA_DETAILS: "LOADING_QUOTA_DETAILS",
};

const getSegmentName = segment => {
  let name = "Outro";
  switch (segment.icone && segment.icone.split("/").reverse()[0]) {
    case "icone-tp-consorcio-imoveis.svg":
      name = "Imóveis";
      break;
    case "icone-tp-consorcio-carros.svg":
      name = "Carros";
      break;
    case "icone-tp-consorcio-moto.svg":
      name = "Moto";
      break;
    case "icone-tp-consorcio-servicos.svg":
      name = "Serviços";
      break;
    case "icone-tp-consorcio-eletro.svg":
      name = "Eletro";
      break;
    default:
      break;
  }
  return name;
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  getSegments: () => async (dispatch, getState) => {
    const token =
      getState().authReducer.authData && getState().authReducer.authData.token;
    let response = await simulationResource.getSegments(token);
    const _segments = [
      "icone-tp-consorcio-imoveis.svg",
      "icone-tp-consorcio-carros.svg",
      "icone-tp-consorcio-moto.svg",
      "icone-tp-consorcio-servicos.svg",
      "icone-tp-consorcio-eletro.svg",
    ];
    let segments = response.data.segments.filter(s =>
      _segments.includes(s.icone && s.icone.split("/").reverse()[0])
    );
    segments.push(response.data.segments.filter(s => !s.icone)[0]);
    segments = segments.map(s => {
      return {
        name: getSegmentName(s),
        _id: s._id,
        imageSrc: s.icone && s.icone.split("/").reverse()[0],
      };
    });
    dispatch(actionCreators.saveSegmentsData(segments));
  },

  getProposal: (idSegment, value) => async (dispatch, getState) => {
    dispatch({ type: types.LOADING_QUOTAS });
    const token =
      getState().authReducer.authData && getState().authReducer.authData.token;
    let response = await simulationResource.getProposals(
      idSegment,
      value,
      token
    );
    if (response.data.success) {
      dispatch({ type: types.SAVE_QUOTAS_DATA, payload: response.data.cotas });
    }
    dispatch({ type: types.LOADING_QUOTAS, payload: { loading: false } });
  },

  saveSelectedQuota: data => async dispatch => {
    dispatch({ type: types.LOADING_QUOTAS, payload: { loading: false } });
    dispatch({ type: types.SAVE_SELECTED_QUOTA, payload: data });
  },

  getQuota: idQuota => async (dispatch, getState) => {
    dispatch({ type: types.LOADING_QUOTA_DETAILS });
    const token =
      getState().authReducer.authData && getState().authReducer.authData.token;
    let response = await simulationResource.getQuotaDetails(idQuota, token);
    console.log(response);
    if (response.data.success) {
      dispatch(actionCreators.saveSelectedQuota(response.data.cota));
    }
    dispatch({
      type: types.LOADING_QUOTA_DETAILS,
      payload: { loading: false },
    });
  },

  saveSegmentsData: data => async dispatch => {
    dispatch({ type: types.SAVE_SEGMENTS_DATA, payload: data });
  },
  clearData: () => dispatch => {
    dispatch({ type: types.CLEAR_SIMULATION_DATA });
  },
};

// Initial state of the store
const initialState = {
  segments: [],
  quotas: [],
  loadedQuotas: false,
  loadingQuotas: false,
  loadingQuotaDetails: false,
  selectedQuota: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SAVE_SEGMENTS_DATA: {
      return {
        ...state,
        segments: payload,
      };
    }
    case types.LOADING_QUOTAS: {
      if (payload && !payload.loading) {
        return {
          ...state,
          loadedQuotas: true,
          loadingQuotas: false,
        };
      }
      return {
        ...state,
        loadingQuotas: true,
      };
    }
    case types.LOADING_QUOTA_DETAILS: {
      if (payload && !payload.loading) {
        return {
          ...state,
          loadingQuotaDetails: false,
        };
      }
      return {
        ...state,
        loadingQuotaDetails: true,
      };
    }
    case types.SAVE_QUOTAS_DATA: {
      return {
        ...state,
        quotas: payload,
      };
    }
    case types.SAVE_SELECTED_QUOTA: {
      return {
        ...state,
        selectedQuota: payload,
      };
    }
    case types.CLEAR_SIMULATION_DATA: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
