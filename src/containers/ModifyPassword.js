import {connect} from 'react-redux'
import ModifyPassword from 'components/ModifyPassword'
import {setBreadCrumb, modifySelfPass} from 'actions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    modifySelfPass: (oldPass, newPass) => {
      dispatch(modifySelfPass(oldPass, newPass))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPassword)
