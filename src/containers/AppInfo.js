import {connect} from 'react-redux'
import AppInfo from 'components/AppInfo'
import {setBreadCrumb, getNewsPagesByPage, setNewsPagesShowLoading, updateNewsPages,
  addNewsPages, getAllAppClients, deleteNewsPageById, getAppContentById, upAndDownNewsById} from 'actions'

const mapStateToProps = state => {
  const appClients = _.map(state.newsPages.AppClients, (item, index) => {
    return {
      label: item,
      value: item
    }
  })
  return {
    newsPagesList: state.newsPages.newsPagesList,
    newsPagesCount: state.newsPages.newsPagesCount,
    newsPagesLoadingShow: state.newsPages.newsPagesLoadingShow,
    showedAppInfo: state.newsPages.showedAppInfo,
    appClients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getNewsPagesByPage: (page, status, client) => {
      dispatch(getNewsPagesByPage(page, status, client))
    },
    setNewsPagesShowLoading: (show) => {
      dispatch(setNewsPagesShowLoading(show))
    },
    addNewsPages: (head, icon, pageContent, appClients, isPublish) => {
      dispatch(addNewsPages(head, icon, pageContent, appClients, isPublish))
    },
    updateNewsPages: (currentPage, newsId, head, icon, pageContent, appClients, isPublish) => {
      dispatch(updateNewsPages(currentPage, newsId, head, icon, pageContent, appClients, isPublish))
    },
    getAllAppClients: () => {
      dispatch(getAllAppClients())
    },
    deleteNewsPageById: (id, title, status, client) => {
      dispatch(deleteNewsPageById(id, title, status, client))
    },
    getAppContentById: (id) => {
      dispatch(getAppContentById(id))
    },
    upAndDownNewsById: (id, isUp, currentPage) => {
      dispatch(upAndDownNewsById(id, isUp, currentPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfo)
