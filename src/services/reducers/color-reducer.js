import { COLOR_CHANGE } from '../types/color-types'

const initialState = {
  background: 'white',
  foreground: 'black'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COLOR_CHANGE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}