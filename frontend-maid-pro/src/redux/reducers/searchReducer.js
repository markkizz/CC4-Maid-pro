import { searchTypes } from '../actions/types'

const initialState = {
  quickSearchType: '',
  filterSearch: []
}

function searchReducer(state=initialState, action) {
  switch (action.type) {
    case searchTypes.QUICK_SEARCH_TYPE:
      return {
        ...state,
        quickSearchType: action.payload
      }
      case searchTypes.FILTER_SEARCH:
      return {
        ...state,
        filterSearch: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer
