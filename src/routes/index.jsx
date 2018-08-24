import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import store from 'store'
import 'whatwg-fetch'
import {appLogger, userManager, wxShare} from 'utils'
import {dateUtils} from 'hsjs'
const logger = appLogger.getLogger('Routes')
const rootPath = '/'
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
  // skipWhenLogin (nextState, replace) {
  //   if (nextState.location.pathname === `${rootPath}/callback`) {
  //     const user = userManager.getUserSync()
  //     if (user && user.profile && user.profile.sub) {
  //       replace({
  //         pathname: rootPath,
  //         state: { nextPathname: nextState.location.pathname }
  //       })
  //     }
  //   }
  // }
  render () {
    return (
      <Router history={browserHistory}>
        <Route>
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
            <Route path='second' getComponents={(nextState, cb) => {
              import(/* webpackChunkName: "second" */ 'containers/Second')
                            .then(module => {
                              cb(null, module.default)
                            })
                            .catch(handleLoadError('/SecondPage'))
            }} />
          </Route>
        </Route>
        {/* <Route path={`${rootPath}/silentcallback`} component={SilentCallback} /> */}
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
