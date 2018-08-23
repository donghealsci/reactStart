import {connect} from 'react-redux'
import RoleAdmin from 'components/RoleAdmin'
import {setBreadCrumb, getRoleByPage, setRoleShowLoading, addRole,
  updateRole, deleteRoleById, getAllAppRoles} from 'actions'

const mapStateToProps = state => {
  const appList = _.map(state.appRoles.rolesList, (item, index) => {
    return {
      label: item.name,
      value: item.applicationCode
    }
  })
  return {
    roleList: state.role.roleList,
    roleCount: state.role.roleCount,
    roleLoadingShow: state.role.roleLoadingShow,
    appList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getRoleByPage: (page, applicationCode) => {
      dispatch(getRoleByPage(page, applicationCode))
    },
    setRoleShowLoading: (show) => {
      dispatch(setRoleShowLoading(show))
    },
    addRole: (roleCode, roleName, application, description) => {
      dispatch(addRole(roleCode, roleName, application, description))
    },
    updateRole: (currentPage, id, roleCode, roleName, application, description) => {
      dispatch(updateRole(currentPage, id, roleCode, roleName, application, description))
    },
    deleteRoleById: (id, roleName) => {
      dispatch(deleteRoleById(id, roleName))
    },
    getAllAppRoles: () => {
      dispatch(getAllAppRoles())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleAdmin)
