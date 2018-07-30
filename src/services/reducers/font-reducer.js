import { CHANGE_FONT } from '../types/font-types'
import db from '../db/db.json'

const initialState = {
  fonts: db.fonts,
  selected: db.fonts[0].family,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FONT:
      return {
        ...state,
        selected: action.payload,
      }
    default:
      return state
  }
}