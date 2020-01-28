import { bookingTypes } from '../actions/types'

const initialState = {
  newBookingCounter: 0,
  upcomming: [],
  history: []
}

// increaseNewBookingBadge, decreaseNewBookingBadge

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case bookingTypes.INCREASE_NEW_BOOKING_BADGE:
      return {
        ...state,
        newBookingCounter: action.payload
      }
    case bookingTypes.DECREASE_NEW_BOOKING_BADGE:
      return {
        ...state,
        newBookingCounter: state.newBookingCounter - 1
      }
    case bookingTypes.MYBOOKING:
      return {
        ...state,
        upcomming: action.payload.upcomming,
        history: action.payload.history
      }
    default:
      return state
  }
}

export default bookingReducer
