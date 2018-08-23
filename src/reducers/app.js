import {combineReducers} from 'redux'

const appLoadingShow = (state = true, action) => {
  switch (action.type) {
    case 'setAppShowLoading':
      return action.payload
    default:
      return state
  }
}

const appList = (state = [], action) => {
  switch (action.type) {
    case 'getAppByPage':
      return action.payload || []
    default:
      return state
  }
}

const appCount = (state = 0, action) => {
  switch (action.type) {
    case 'getAppCount':
      return action.payload || 0
    default:
      return state
  }
}

export default combineReducers({
  appLoadingShow,
  appList,
  appCount
})
