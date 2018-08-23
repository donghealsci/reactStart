import * as types from '../constants'
import {combineReducers} from 'redux'

const accessToken = (state='', action) => {
  switch (action.type) {
    case types.USER_FOUND:
      return action.payload.access_token || ''
    case types.USER_SIGNED_OUT:
      return ''
    default:
      return state
  }
}

const profile = (state = {}, action) => {
  switch (action.type) {
    case types.USER_FOUND:
      return action.payload.profile || {}
    case types.USER_SIGNED_OUT:
      return {}
    default:
      return state
  }
}

const expiresAt = (state = 0, action) => {
  switch (action.type) {
    case types.USER_FOUND:
      return action.payload.expires_at || 0
    case types.USER_SIGNED_OUT:
      return 0
    default:
      return state
  }
}

const tokenType = (state = '', action) => {
  switch (action.type) {
    case types.USER_FOUND:
      return action.payload.token_type || ''
    case types.USER_SIGNED_OUT:
      return ''
    default:
      return state
  }
}

export default combineReducers({
  accessToken,
  profile,
  expiresAt,
  tokenType
})