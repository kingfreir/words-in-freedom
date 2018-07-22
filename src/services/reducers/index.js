import { combineReducers } from 'redux'
import colorReducer from './color-reducer'
import drawerReducer from './drawer-reducer'
import fontReducer from './font-reducer'

const reducers = combineReducers({
  color: colorReducer,
  drawers: drawerReducer,
  fonts: fontReducer,
})

export default reducers