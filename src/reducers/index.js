import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import breadCrumb from './breadCrumb'
import user from './user'
import client from './client'
import role from './role'
import app from './app'
import group from './group'
import appRoles from './appRoles'
import newsPages from './newsPages'
import menu from './menu'

const rootReducer = combineReducers({
  routing: routerReducer,
  breadCrumb,
  user,
  client,
  role,
  group,
  appRoles,
  app,
  newsPages,
  menu
})

export default rootReducer
