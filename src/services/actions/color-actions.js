import { COLOR_CHANGE } from '../types/color-types'

export const changeColor = color => ({
  type: COLOR_CHANGE,
  payload: color
})
