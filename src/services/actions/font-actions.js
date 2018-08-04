import {
  CHANGE_FONT,
  CHANGE_FONT_SIZE,
  CHANGE_ROTATION,
} from '../types/font-types'

export const changeFont = font => ({
  type: CHANGE_FONT,
  payload: font,
})

export const changeFontSize = size => ({
  type: CHANGE_FONT_SIZE,
  payload: size,
})

export const changeRotation = degrees => ({
  type: CHANGE_ROTATION,
  payload: degrees,
})