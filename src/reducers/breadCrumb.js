import {combineReducers} from 'redux'

const firstNav = (state = '首页', action) => {
  switch (action.type) {
    case 'setFirstNav':
      return action.payload || ''
    default:
      return state
  }
}

const secondNav = (state = '二级面包屑', action) => {
  switch (action.type) {
    case 'setSecondNav':
      return action.payload || ''
    default:
      return state
  }
}

export default combineReducers({
  firstNav,
  secondNav
})
