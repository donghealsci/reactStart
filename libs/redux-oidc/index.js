import provider from './OidcProvider'
import * as actionTypes from './constants'
import * as actions from './actions'
import reducers from './reducers'

export const OidcProvider = provider
export const oidcReducer = reducers
export const oidcActions = actions
export const oidcActionTypes = actionTypes

export default {
  OidcProvider,
  oidcActionTypes,
  oidcReducer,
  oidcActions
}
