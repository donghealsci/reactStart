// Utilities
import appLogger from './logger'
import joinClassNames from './join-class-names'
import userManager from './userManager'
import {generateUUID} from './uuid'
import {mandatory} from './param-check'
import * as localStore from './localStore'
import * as wxShare from './wxShare'
import {numberUtils} from 'hsjs'

const executeWithAuth = (authCb, unAuthCb) => {
  userManager.getUser()
        .then(user => {
          if (user && authCb && authCb.call) {
            authCb.call()
          } else if (!user && unAuthCb && unAuthCb.call) {
            unAuthCb.call()
          }
        })
}

export {
    appLogger,
    joinClassNames,
    userManager,
    executeWithAuth,
    generateUUID,
    mandatory,
    localStore,
    wxShare,
    numberUtils
}
