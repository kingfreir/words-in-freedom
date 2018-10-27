import { combineReducers } from 'redux'
import undoable from 'redux-undo'

import colorReducer from './color-reducer'
import drawerReducer from './drawer-reducer'
import fontReducer from './font-reducer'
import canvasReducer from './canvas-reducer'

const reducers = combineReducers({
  color: colorReducer,
  drawers: drawerReducer,
  fonts: fontReducer,
  canvas: undoable(canvasReducer), // { limit: 10 }
})

export default reducers