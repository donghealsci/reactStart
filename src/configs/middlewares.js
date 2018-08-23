import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import {logger, request, createOidcMiddleWare} from '../middlewares'
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'
import {userManager} from 'utils'

const mws = [
    routerMiddleware(browserHistory),
    createOidcMiddleWare(userManager),
    thunk,
    request,
    logger
]

export default mws
