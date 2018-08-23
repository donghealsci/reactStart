import {combineReducers} from 'redux'

const userList = (state = [], action) => {
  switch (action.type) {
    case 'getUserByPage':
      return action.payload || []
    default:
      return state
  }
}

const userCount = (state = 0, action) => {
  switch (action.type) {
    case 'getUserCount':
      return action.payload || 0
    default:
      return state
  }
}

const userRoles = (state = [], action) => {
  switch (action.type) {
    case 'getUserRolesByUserName':
      return action.payload || []
    default:
      return state
  }
}

const loadingShow = (state = true, action) => {
  switch (action.type) {
    case 'setShowLoading':
      return action.payload
    default:
      return state
  }
}

const importLoadingShow = (state = false, action) => {
  switch (action.type) {
    case 'setImportLoading':
      return action.payload
    default:
      return state
  }
}

const importInfoShow = (state = false, action) => {
  switch (action.type) {
    case 'setImportInfoShow':
      return action.payload
    default:
      return state
  }
}

const importInfo = (state = '', action) => {
  switch (action.type) {
    case 'setImportInfo':
      return action.payload
    default:
      return state
  }
}

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case 'getLoginUserInfo':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  userList,
  userCount,
  userRoles,
  loadingShow,
  loginUser,
  importLoadingShow,
  importInfoShow,
  importInfo
})
