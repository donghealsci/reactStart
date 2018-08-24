import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import breadCrumb from './breadCrumb'

const rootReducer = combineReducers({
  routing: routerReducer,
  breadCrumb
})

export default rootReducer
