// This config file is for debugging locally
// frontend will be host be webpack-dev-server
const HOST = ''
const AUTH_HOST = ''

const userManagerConfig = {
  authority: 'https://service1dev.healscitech.com/oidcserver',
  client_id: 'pathologyWebAppDebug',
  redirect_uri: 'https://localhost:8000/pathology/web/callback',
  silent_redirect_uri: 'https://localhost:8000/pathology/web/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://localhost:8000/pathology/web',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const userManagerMobileConfig = {
  authority: 'https://service1dev.healscitech.com/oidcserver',
    // authority: 'https://authdev.healscitech.com',
  client_id: 'pathologyMobileAppDebug',
  redirect_uri: 'https://localhost:8020/pathology/m/callback',
  silent_redirect_uri: 'https://localhost:8020/pathology/m/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://localhost:8020/pathology/m',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
    // accessTokenExpiringNotificationTime: 3150
}

const ENV = 'debug'
const weChatAppkey = 'wechat_app_dev'

export default {
  HOST,
  userManagerConfig,
  userManagerMobileConfig,
  ENV,
  AUTH_HOST,
  weChatAppkey
}
