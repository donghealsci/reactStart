import {combineReducers} from 'redux'

const rolesList = (state = [], action) => {
  switch (action.type) {
    case 'getAllAppRoles':
      return action.payload || []
    default:
      return state
  }
}

export default combineReducers({
  rolesList
})
