import {combineReducers} from 'redux'

const roleLoadingShow = (state = true, action) => {
  switch (action.type) {
    case 'setRoleShowLoading':
      return action.payload
    default:
      return state
  }
}

const roleList = (state = [], action) => {
  switch (action.type) {
    case 'getRoleByPage':
      return action.payload || []
    default:
      return state
  }
}

const roleCount = (state = 0, action) => {
  switch (action.type) {
    case 'getRoleCount':
      return action.payload || 0
    default:
      return state
  }
}

export default combineReducers({
  roleLoadingShow,
  roleList,
  roleCount
})
