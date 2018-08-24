import {connect} from 'react-redux'
import Root from 'components/Root'

const mapStateToProps = state => {
  return {
    firstNav: state.breadCrumb.firstNav,
    secondNav: state.breadCrumb.secondNav
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
