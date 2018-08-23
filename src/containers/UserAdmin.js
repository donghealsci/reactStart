import {connect} from 'react-redux'
import UserAdmin from 'components/UserAdmin'
import {setBreadCrumb, getUserByPage, getAllAppRoles, addUser, deleteUserById, importDoctorFile, importPatientFile,
  updateUser, modifyPass, getUserByQuery, setShowLoading, modifyUserEnable, resetImportStatus} from 'actions'

const mapStateToProps = state => {
  return {
    userList: state.user.userList,
    rolesList: state.appRoles.rolesList,
    userCount: state.user.userCount,
    userRoles: state.user.userRoles,
    loadingShow: state.user.loadingShow,
    userPage: Math.ceil(state.user.userCount / 5),
    importLoadingShow: state.user.importLoadingShow,
    importInfoShow: state.user.importInfoShow,
    importInfo: state.user.importInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getUserByPage: (page, userId, username, phoneNumber) => {
      dispatch(getUserByPage(page, userId, username, phoneNumber))
    },
    getAllAppRoles: () => {
      dispatch(getAllAppRoles())
    },
    addUser: (username, password, phoneNumber, email, nickname, name, employer, department, title, groupRoles) => {
      dispatch(addUser(username, password, phoneNumber, email, nickname, name, employer, department, title, groupRoles))
    },
    deleteUserById: (userId, userName) => {
      dispatch(deleteUserById(userId, userName))
    },
    updateUser: (currentPage, username, targetUserId, phoneNumber, email, nickname, name, employer, department, title, groupRoles) => {
      dispatch(updateUser(currentPage, username, targetUserId, phoneNumber, email, nickname, name, employer, department, title, groupRoles))
    },
    modifyPass: (targetUserId, newPassword) => {
      dispatch(modifyPass(targetUserId, newPassword))
    },
    getUserByQuery: (userName, phoneNumber) => {
      dispatch(getUserByQuery(userName, phoneNumber))
    },
    setShowLoading: (show) => {
      dispatch(setShowLoading(show))
    },
    modifyUserEnable: (targetUserId, enable, pageIndex) => {
      dispatch(modifyUserEnable(targetUserId, enable, pageIndex))
    },
    importDoctorFile: (file) => {
      dispatch(importDoctorFile(file))
    },
    importPatientFile: (file) => {
      dispatch(importPatientFile(file))
    },
    resetImportStatus: () => {
      dispatch(resetImportStatus())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin)
