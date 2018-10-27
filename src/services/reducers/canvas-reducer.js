import {
  UPDATE_CANVAS,
  EDIT_GLOBAL,
  EDIT_SENTENCE,
  SELECT_SENTENCE,
} from '../types/canvas-types'

import {
  COLOR_CHANGE,
} from '../types/color-types'

import {
  CHANGE_FONT,
  CHANGE_FONT_SIZE,
  CHANGE_ROTATION,
  CHANGE_SPACING,
} from '../types/font-types'

import db from '../db/db.json'

const initialState = {
  content: {},
  global: {
    fonts: {
      fonts: db.fonts,
      selected: db.fonts[0].family,
      size: '30',
      rotation: '0',
      spacing: '0',
    },
    color: {
      background: 'white',
      foreground: 'black'
    },
  },
  selected: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CANVAS:
      return {
        ...state,
        content: {
          ...state.content,
          [action.payload.id]: action.payload
        },
        selected: action.payload.id,
      }
    
    case SELECT_SENTENCE:
      return {
        ...state,
        selected: action.payload,
      }

    case EDIT_SENTENCE:
      return {
        ...state,
        content: {
          ...state.content,
          [action.payload.id]: {
            ...state.content[action.payload.id],
            ...action.payload,
          }
        }
      }

    case EDIT_GLOBAL:
      return {
        ...state,
        global: action.payload,
      }

    case COLOR_CHANGE:
      return {
        ...state,
        global: {
          ...state.global,
          color: { ...action.payload },
        }
      }

    case CHANGE_FONT:
      return {
        ...state,
        global: {
          ...state.global,
          fonts: {
            ...state.global.fonts,
            selected: action.payload,
          },
        },
      }
    case CHANGE_FONT_SIZE:
      return {
        ...state,
        global: {
          ...state.global,
          fonts: {
            ...state.global.fonts,
            size: action.payload,
          },
        },
      }
    case CHANGE_ROTATION:
      return {
        ...state,
        global: {
          ...state.global,
          fonts: {
            ...state.global.fonts,
            rotation: action.payload,
          },
        },
      }
    case CHANGE_SPACING:
      return {
        ...state,
        global: {
          ...state.global,
          fonts: {
            ...state.global.fonts,
            spacing: action.payload
          }
        }
      }

    default:
      return state
  }
}