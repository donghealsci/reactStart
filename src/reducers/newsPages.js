import {combineReducers} from 'redux'

const newsPagesLoadingShow = (state = true, action) => {
  switch (action.type) {
    case 'setNewsPagesShowLoading':
      return action.payload
    default:
      return state
  }
}

const newsPagesList = (state = [], action) => {
  switch (action.type) {
    case 'getNewsPagesByPage':
      return action.payload || []
    default:
      return state
  }
}

const newsPagesCount = (state = 0, action) => {
  switch (action.type) {
    case 'getNewsPagesCount':
      return action.payload || 0
    default:
      return state
  }
}

const AppClients = (state = [], action) => {
  switch (action.type) {
    case 'getAllAppClients':
      return action.payload || []
    default:
      return state
  }
}

const showedAppInfo = (state = '', action) => {
  switch (action.type) {
    case 'showedAppContent':
      return action.payload || ''
    default:
      return state
  }
}

export default combineReducers({
  newsPagesLoadingShow,
  newsPagesList,
  newsPagesCount,
  AppClients,
  showedAppInfo
})
