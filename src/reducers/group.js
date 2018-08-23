import {combineReducers} from 'redux'

const groupLoadingShow = (state = true, action) => {
  switch (action.type) {
    case 'setGroupShowLoading':
      return action.payload
    default:
      return state
  }
}

const groupList = (state = [], action) => {
  switch (action.type) {
    case 'getGroupByPage':
      return action.payload || []
    default:
      return state
  }
}

const groupCount = (state = 0, action) => {
  switch (action.type) {
    case 'getGroupCount':
      return action.payload || 0
    default:
      return state
  }
}

export default combineReducers({
  groupLoadingShow,
  groupList,
  groupCount
})
