import { createStore } from 'redux'
import reducers from './services/reducers'

const store = createStore(reducers)

export default store