import {connect} from 'react-redux'
import AppAdmin from 'components/AppAdmin'
import {setBreadCrumb, getAppByPage, setAppShowLoading, addApp, deleteAppById, updateApp} from 'actions'

const mapStateToProps = state => {
  return {
    appList: state.app.appList,
    appCount: state.app.appCount,
    appLoadingShow: state.app.appLoadingShow
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getAppByPage: (page, name, applicationCode) => {
      dispatch(getAppByPage(page, name, applicationCode))
    },
    setAppShowLoading: (show) => {
      dispatch(setAppShowLoading(show))
    },
    addApp: (appCode, name) => {
      dispatch(addApp(appCode, name))
    },
    deleteAppById: (id, appName) => {
      dispatch(deleteAppById(id, appName))
    },
    updateApp: (currentPage, id, applicationCode, name) => {
      dispatch(updateApp(currentPage, id, applicationCode, name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppAdmin)
