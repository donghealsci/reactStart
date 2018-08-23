import {connect} from 'react-redux'
import Root from 'components/Root'
import {getLeftMenu} from 'actions'

const mapStateToProps = state => {
  return {
    firstNav: state.breadCrumb.firstNav,
    secondNav: state.breadCrumb.secondNav,
    menuList: state.menu.menuList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLeftMenu: () => {
      dispatch(getLeftMenu())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
