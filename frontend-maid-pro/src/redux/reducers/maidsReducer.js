import { maidsTypes } from "../actions/types";

const initialState = {
  maids: []
};

function maidsReducer(state = initialState, action) {
  switch (action.type) {
    case maidsTypes.FETCH_MAIDS:
      return {
        ...state,
        fetchMaids: action.payload
      };
    default:
      return state
  }
}

export default maidsReducer
