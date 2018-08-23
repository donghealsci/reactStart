// This config file is used to distribute code on DEV environment
const HOST = 'https://communitydev.healscitech.com'
const AUTH_HOST = 'https://service1dev.healscitech.com'

const userManagerConfig = {
  authority: 'https://service1dev.healscitech.com/oidcserver/',
  client_id: 'pathologyWebAppDev',
  redirect_uri: 'https://communitydev.healscitech.com/pathology/web/callback',
  silent_redirect_uri: 'https://communitydev.healscitech.com/pathology/web/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://communitydev.healscitech.com/pathology/web',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const userManagerMobileConfig = {
  authority: 'https://service1dev.healscitech.com/oidcserver/',
  client_id: 'pathologyMobileAppDev',
  redirect_uri: 'https://communitydev.healscitech.com/pathology/m/callback',
  silent_redirect_uri: 'https://communitydev.healscitech.com/pathology/m/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://communitydev.healscitech.com/pathology/m',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const ENV = 'dev'
const weChatAppkey = 'wechat_app_dev'

export default {
  HOST,
  AUTH_HOST,
  userManagerConfig,
  userManagerMobileConfig,
  ENV,
  weChatAppkey
}
