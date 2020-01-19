import { searchTypes } from '../actions/types'

const initialState = {
  quickSearchType: '',
  filterSearch: []
}

function searchReducer(state=initialstate, action) {
  switch (action.type) {
    case searchTypes.QUICK_SEARCH_TYPE:
      return null

    default:
      return state;
  }
}

export default searchReducer
