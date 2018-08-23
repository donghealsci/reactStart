import oidc from 'oidc-client'
const prefix = 'path.'
const {userManagerMobileConfig} = globalConfig.default

userManagerMobileConfig.userStore =  new oidc.WebStorageStateStore({ 
    store: window.localStorage, 
    prefix: prefix
})

const userMgr = new oidc.UserManager(userManagerMobileConfig)

userMgr.getUserSync = () => {
    return JSON.parse(window.localStorage.getItem(prefix + userMgr._userStoreKey))
}
// debugger

// oidc.Log.logger = console
// oidc.Log.level  = oidc.Log.DEBUG

export default userMgr
