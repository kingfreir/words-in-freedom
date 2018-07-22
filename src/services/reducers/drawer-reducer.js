import { GET_DRAWERS } from '../types/drawer-types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DRAWERS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}