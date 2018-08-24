import {connect} from 'react-redux'
import Second from 'components/Second'
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

export default connect(mapStateToProps, mapDispatchToProps)(Second)
