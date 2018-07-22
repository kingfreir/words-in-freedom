import { GET_DRAWERS } from '../types/drawer-types'
import db from '../db/db.json'

export const getDrawers = () => ({
  type: GET_DRAWERS,
  payload: db.drawers,
})