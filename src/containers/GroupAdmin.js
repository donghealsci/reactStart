import {connect} from 'react-redux'
import GroupAdmin from 'components/GroupAdmin'
import {setBreadCrumb, getGroupByPage, setGroupShowLoading, getAllAppRoles, addGroup,
  updateGroup, deleteGroupById} from 'actions'

const mapStateToProps = state => {
  const appList = _.map(state.appRoles.rolesList, (item, index) => {
    return {
      label: item.name,
      value: item.applicationCode
    }
  })
  return {
    groupList: state.group.groupList,
    groupCount: state.group.groupCount,
    groupLoadingShow: state.group.groupLoadingShow,
    appList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getGroupByPage: (page, applicationCode) => {
      dispatch(getGroupByPage(page, applicationCode))
    },
    setGroupShowLoading: (show) => {
      dispatch(setGroupShowLoading(show))
    },
    getAllAppRoles: () => {
      dispatch(getAllAppRoles())
    },
    addGroup: (groupId, groupName, alias, identifier, systemApplications, image) => {
      dispatch(addGroup(groupId, groupName, alias, identifier, systemApplications, image))
    },
    updateGroup: (currentPage, fileChanged, id, groupId, groupName, alias, identifier, systemApplications, image) => {
      dispatch(updateGroup(currentPage, fileChanged, id, groupId, groupName, alias, identifier, systemApplications, image))
    },
    deleteGroupById: (id, groupName) => {
      dispatch(deleteGroupById(id, groupName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdmin)
