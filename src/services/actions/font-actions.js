import { GET_FONTS } from '../types/font-types'
import db from '../db/db.json'

export const getDrawers = () => ({
  type: GET_FONTS,
  payload: db.fonts,
})