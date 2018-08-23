import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import store from 'store'
import 'whatwg-fetch'
import {appLogger, userManager, wxShare} from 'utils'
import {dateUtils} from 'hsjs'
const logger = appLogger.getLogger('Routes')
const rootPath = 'setup/index'
const {HOST} = globalConfig.default

const handleLoadError = (path) => {
  return (err) => {
    logger.error(`Failed to load modules when routing to ${path}`, err)
  }
}

class SilentCallback extends React.Component {
  componentDidMount () {
    userManager.signinSilentCallback()
            .then(user => {
              logger.debug('signin silent successfully')
            }, error => {
              logger.error('signin redirect failed', error)
            })
  }
  render () {
    return (
      <h1>The silent renew page, should never be shown</h1>
    )
  }
}

class Routes extends React.Component {
  skipWhenLogin (nextState, replace) {
    if (nextState.location.pathname === `${rootPath}/callback`) {
      const user = userManager.getUserSync()
      if (user && user.profile && user.profile.sub) {
        replace({
          pathname: rootPath,
          state: { nextPathname: nextState.location.pathname }
        })
      }
    }
  }
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRedirect to={`${rootPath}`} />
          <Route path={`${rootPath}`} getComponents={(nextState, cb) => {
            import(/* webpackChunkName: "root" */ 'containers/Root')
                              .then(module => {
                                cb(null, module.default)
                              })
                              .catch(handleLoadError('/RootComponent'))
          }} >
            <IndexRoute getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "index" */ 'containers/Index')
                              .then(module => {
                                cb(null, module.default)
                              })
                              .catch(handleLoadError('/Index'))
            }} />
            <Route path='client' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "clientAdmin" */ 'containers/ClientAdmin')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/ClientAdmin'))
            }} />
            <Route path='user/userManage' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "userAdmin" */ 'containers/UserAdmin')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/UserAdmin'))
            }} />
            <Route path='role/roleManage' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "roleAdmin" */ 'containers/RoleAdmin')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/RoleAdmin'))
            }} />
            <Route path='app/appManage' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "appAdmin" */ 'containers/AppAdmin')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/AppAdmin'))
            }} />
            <Route path='group/groupManage' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "groupAdmin" */ 'containers/GroupAdmin')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/GroupAdmin'))
            }} />
            <Route path='personal/password' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "modifyPassword" */ 'containers/ModifyPassword')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/ModifyPassword'))
            }} />
            <Route path='appinfo/appinfo' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "appInfo" */ 'containers/AppInfo')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/AppInfo'))
            }} />
            <Route path='appinfo/column' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "columnAdmin" */ 'containers/ColumnAdmin')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/ColumnAdmin'))
            }} />
          </Route>
        </Route>
        <Route path={`${rootPath}/silentcallback`} component={SilentCallback} />
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
