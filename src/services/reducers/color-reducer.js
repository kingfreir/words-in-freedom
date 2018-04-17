import { COLOR_CHANGE } from '../types/color-types'

const colorReducer = (state = {}, action) => {
  switch (action.type) {
    case COLOR_CHANGE: {
      return state
    }
    default:
      return state
  }
}

export default colorReducer