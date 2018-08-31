import { createStore, combineReducers } from 'redux'
import cartReducer from './reducers/cartReducer'

const reducer = combineReducers({ cartReducer })

let store = createStore(reducer)

export default store
