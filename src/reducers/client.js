import {combineReducers} from 'redux'

const clientList = (state = [], action) => {
  switch (action.type) {
    case 'getClientsByPage':
      return action.payload || []
    default:
      return state
  }
}

const clientCount = (state = 0, action) => {
  switch (action.type) {
    case 'getClientsCount':
      return action.payload || 0
    default:
      return state
  }
}

const clientLoadingShow = (state = true, action) => {
  switch (action.type) {
    case 'setClientShowLoading':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  clientList,
  clientCount,
  clientLoadingShow
})
