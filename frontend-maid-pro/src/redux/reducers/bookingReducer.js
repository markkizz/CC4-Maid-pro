import { badgeBookingTypes } from '../actions/types'

const initialState = {
  newBookingCouter: 0
}

// increaseNewBookingBadge, decreaseNewBookingBadge

function bookingBadgeReducer(state = initialState, action) {
  switch (action.type) {
    case badgeBookingTypes.INCREASE_NEW_BOOKING_BADGE:
      return {
        ...state,
        newBookingCouter: state.newBookingCouter + 1
      }
    case badgeBookingTypes.DECREASE_NEW_BOOKING_BADGE:
      return {
        ...state,
        newBookingCouter: state.newBookingCouter - 1
      }
    default:
      return state
  }
}

export default bookingBadgeReducer