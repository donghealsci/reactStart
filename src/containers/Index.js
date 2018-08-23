import {connect} from 'react-redux'
import Index from 'components/Index'
import {setBreadCrumb, getLoginUserInfo} from 'actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getLoginUserInfo: () => {
      dispatch(getLoginUserInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
