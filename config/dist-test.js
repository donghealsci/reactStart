// This config file is used to distribute code on DEV environment
const HOST = 'https://communitytest.healscitech.com'
const AUTH_HOST = 'https://servicetest.healscitech.com'

const userManagerConfig = {
  authority: 'https://servicetest.healscitech.com/oidcserver/',
  client_id: 'pathologyWebAppTest',
  redirect_uri: 'https://communitytest.healscitech.com/pathology/web/callback',
  silent_redirect_uri: 'https://communitytest.healscitech.com/pathology/web/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://communitytest.healscitech.com/pathology/web',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const userManagerMobileConfig = {
  authority: 'https://servicetest.healscitech.com/oidcserver/',
  client_id: 'pathologyMobileAppTest',
  redirect_uri: 'https://communitytest.healscitech.com/pathology/m/callback',
  silent_redirect_uri: 'https://communitytest.healscitech.com/pathology/m/silentcallback',
  response_type: 'id_token token',
  scope: 'openid profile pathologyWebAPI',
  post_logout_redirect_uri: 'https://communitytest.healscitech.com/pathology/m',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true
}

const ENV = 'test'
const weChatAppkey = 'wechat_app_test'

export default {
  HOST,
  userManagerConfig,
  userManagerMobileConfig,
  ENV,
  AUTH_HOST,
  weChatAppkey
}
