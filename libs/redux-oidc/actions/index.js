import {
  USER_FOUND,
  USER_SIGNED_OUT,
  USER_EXPIRED,
  LOADING_USER
} from '../constants'

// dispatched when a user has been found in storage
export const userFound = user => {
  return {
    type: USER_FOUND,
    payload: user
  }
}

export const userSignedOut = () => {
  return {
    type: USER_SIGNED_OUT
  }
}

//dispatched when the existing user expired
export const userExpired = () => {
  return {
    type: USER_EXPIRED
  }
}

// dispatched when a new user is loading
export const loadingUser = () => {
  return {
    type: LOADING_USER
  }
}

export default {
  userFound,
  userSignedOut,
  userExpired,
  loadingUser
}