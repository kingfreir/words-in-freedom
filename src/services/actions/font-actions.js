import { CHANGE_FONT } from '../types/font-types'

export const changeFont = font => ({
  type: CHANGE_FONT,
  payload: font,
})