import { badgeBookingTypes } from '../actions/types'

const initialState = {
  newBookingCounter: 0
}

// increaseNewBookingBadge, decreaseNewBookingBadge

function bookingBadgeReducer(state = initialState, action) {
  switch (action.type) {
    case badgeBookingTypes.INCREASE_NEW_BOOKING_BADGE:
      return {
        ...state,
        newBookingCounter: action.payload
      }
    case badgeBookingTypes.DECREASE_NEW_BOOKING_BADGE:
      return {
        ...state,
        newBookingCounter: state.newBookingCounter - 1
      }
    default:
      return state
  }
}

export default bookingBadgeReducer
