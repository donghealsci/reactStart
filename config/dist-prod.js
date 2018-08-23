// This config file is used to distribute code on PRODUCTION environment
const HOST = 'https://community.healscitech.com'
// const AUTH_HOST = 'https://service1.healscitech.com'
const AUTH_HOST = ''

const userManagerConfig = {
  authority: 'https://service.healscitech.com/oidcserver/',
  client_id: 'pathologyWebApp',
  redirect_uri: 'https://community.healscitech.com/pathology/web/callback',
  silent_redirect_uri: 'https://community.healscitech.com/pathology/web/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://community.healscitech.com/pathology/web',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const userManagerMobileConfig = {
  authority: 'https://service.healscitech.com/oidcserver/',
  client_id: 'pathologyMobileApp',
  redirect_uri: 'https://community.healscitech.com/pathology/m/callback',
  silent_redirect_uri: 'https://community.healscitech.com/pathology/m/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://community.healscitech.com/pathology/m',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const ENV = 'prod'
const weChatAppkey = 'wechat_app_p'

export default {
  HOST,
  userManagerConfig,
  userManagerMobileConfig,
  ENV,
  AUTH_HOST,
  weChatAppkey
}
