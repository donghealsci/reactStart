import {connect} from 'react-redux'
import ColumnAdmin from 'components/ColumnAdmin'
import {setBreadCrumb, getAllAppRoles} from 'actions'

const mapStateToProps = state => {
  const appList = _.map(state.appRoles.rolesList, (item, index) => {
    return {
      label: item.name,
      value: item.applicationCode
    }
  })
  return {
    appList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getAllAppRoles: () => {
      dispatch(getAllAppRoles())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnAdmin)
