import { GET_FONTS } from '../types/font-types'

const initialState = {
  fonts: [],
  selected: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FONTS:
      return {
        fonts: action.payload,
        selected: action.payload[0].family
      }
    default:
      return state
  }
}