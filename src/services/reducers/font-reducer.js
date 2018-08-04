import {
  CHANGE_FONT,
  CHANGE_FONT_SIZE,
  CHANGE_ROTATION,
} from '../types/font-types'
import db from '../db/db.json'

const initialState = {
  fonts: db.fonts,
  selected: db.fonts[0].family,
  size: '10',
  rotation: '0',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FONT:
      return {
        ...state,
        selected: action.payload,
      }
    case CHANGE_FONT_SIZE:
      return {
        ...state,
        size: action.payload,
      }
    case CHANGE_ROTATION:
      return {
        ...state,
        rotation: action.payload
      }
    default:
      return state
  }
}