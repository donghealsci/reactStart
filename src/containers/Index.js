import {connect} from 'react-redux'
import Index from 'components/Index'
import {setBreadCrumb} from 'actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
