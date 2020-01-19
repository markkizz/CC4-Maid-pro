import { maidTypes } from '../actions/types'

const initialState = {
  selectedMaid: 0
}

function maidReducer(state=initialState, action) {
  switch (action.type) {
    case maidTypes.SELECTED_MAID:
      return {
        ...state,
        selectedMaid: action.payload
      }
    default:
      return state
  }
}

export default maidReducer
