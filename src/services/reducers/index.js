import { combineReducers } from 'redux'
import colorReducer from './color-reducer'

const reducers = combineReducers({
  color: colorReducer
})

export default reducers