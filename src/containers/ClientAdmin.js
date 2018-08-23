import {connect} from 'react-redux'
import ClientAdmin from 'components/ClientAdmin'
import {setBreadCrumb, getClientsByPage, setClientShowLoading, getClientsByQuery, addClient,
  updateClient, deleteClientById} from 'actions'

const mapStateToProps = state => {
  return {
    clientLoadingShow: state.client.clientLoadingShow,
    clientList: state.client.clientList,
    clientCount: state.client.clientCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBreadCrumb: (firstNav, secondNav) => {
      dispatch(setBreadCrumb(firstNav, secondNav))
    },
    getClientsByPage: (page, clientId) => {
      dispatch(getClientsByPage(page, clientId))
    },
    setClientShowLoading: (showState) => {
      dispatch(setClientShowLoading(showState))
    },
    getClientsByQuery: (clientId) => {
      dispatch(getClientsByQuery(clientId))
    },
    addClient: (clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds, refreshTokenValiditySeconds, apiScopeName, redirectUrl, postLogoutRedirectUri) => {
      dispatch(addClient(clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds, refreshTokenValiditySeconds, apiScopeName, redirectUrl, postLogoutRedirectUri))
    },
    updateClient: (currentPage, id, clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds, refreshTokenValiditySeconds, apiScopeName, redirectUrl, postLogoutRedirectUri) => {
      dispatch(updateClient(currentPage, id, clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds, refreshTokenValiditySeconds, apiScopeName, redirectUrl, postLogoutRedirectUri))
    },
    deleteClientById: (id, clientId) => {
      dispatch(deleteClientById(id, clientId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientAdmin)
