import {combineReducers} from 'redux'

const menuList = (state = [], action) => {
  switch (action.type) {
    case 'getMenuList':
      return action.payload || []
    default:
      return state
  }
}

export default combineReducers({
  menuList
})
