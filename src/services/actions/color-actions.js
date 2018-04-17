import { COLOR_CHANGE } from '../types/color-types'

const changeColor = color => ({
  type: COLOR_CHANGE,
  payload: color
})

export default {
  changeColor
}