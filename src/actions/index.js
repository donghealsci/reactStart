import * as helper from './action-helper'
import 'whatwg-fetch'
import {userManager, generateUUID} from 'utils'
import {message} from 'antd'
const {checkStatus, jsonToParamStr, logger} = helper
const utils = require('utility')
// const HOST = 'https://communitydev.healscitech.com'
const {HOST, AUTH_HOST} = globalConfig.default

export const formatCategoryData = data => {
  const result = {
    path: '全部',
    label: '全部',
    categoryId: 0,
    children: null
  }

  if (_.isEmpty(data)) {
    return result
  }

  result.children = {}
  _.map(data, d => {
    result.children[d.name] = parseCategoryNode(d, result.path)
  })
  return result
}

export const parseCategoryNode = (data, prefix) => {
  const result = {
    categoryId: data.categoryId,
    path: `${prefix}/${data.name}`,
    label: data.name,
    children: null,
    num: data.caseNum
  }
  if (_.isEmpty(data.children)) {
    return result
  }

  result.children = {}
  _.map(data.children, child => {
    result.children[child.name] = parseCategoryNode(child, result.path)
  })
  return result
}

export const setShowLoading = (show = true) => {
  return (dispatch) => {
    dispatch({type: 'setShowLoading', payload: show})
  }
}

export const setClientShowLoading = (show = true) => {
  return (dispatch) => {
    dispatch({type: 'setClientShowLoading', payload: show})
  }
}

export const setRoleShowLoading = (show = true) => {
  return (dispatch) => {
    dispatch({type: 'setRoleShowLoading', payload: show})
  }
}

export const setAppShowLoading = (show = true) => {
  return (dispatch) => {
    dispatch({type: 'setAppShowLoading', payload: show})
  }
}

export const setGroupShowLoading = (show = true) => {
  return (dispatch) => {
    dispatch({type: 'setGroupShowLoading', payload: show})
  }
}

export const setNewsPagesShowLoading = (show = true) => {
  return (dispatch) => {
    dispatch({type: 'setNewsPagesShowLoading', payload: show})
  }
}

export const getUserByPage = (page = 0, userId, username, phoneNumber) => {
  let strObj = {'page': page, 'size': 5}
  if (userId !== '') {
    strObj['userId'] = userId
  }
  if (username !== '') {
    strObj['username'] = username
  }
  if (phoneNumber !== '') {
    strObj['phoneNumber'] = phoneNumber
  }
  const endStr = jsonToParamStr(strObj)
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getUserByPage', payload: result.list})
        dispatch({type: 'getUserCount', payload: result.total})
      } else {
        dispatch({type: 'getUserByPage', payload: []})
        dispatch({type: 'getUserCount', payload: 0})
      }
      dispatch(setShowLoading(false))
    }).catch(err => {
      dispatch(setShowLoading(false))
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getGroupByPage = (page = 0, applicationCode) => {
  const endStr = applicationCode ? jsonToParamStr({'page': page, 'size': 5, applicationCode}) : jsonToParamStr({'page': page, 'size': 5})
  const fetchUrl = `${AUTH_HOST}/setup/api/web/groups?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getGroupByPage', payload: result.list})
        dispatch({type: 'getGroupCount', payload: result.total})
      } else {
        dispatch({type: 'getGroupByPage', payload: []})
        dispatch({type: 'getGroupCount', payload: 0})
      }
      dispatch(setGroupShowLoading(false))
    }).catch(err => {
      dispatch(setGroupShowLoading(false))
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getAppByPage = (page = 0, name, applicationCode) => {
  let objStr = {'page': page, 'size': 5}
  if (name) {
    objStr['name'] = name
  }
  if (applicationCode) {
    objStr['applicationCode'] = applicationCode
  }
  const endStr = jsonToParamStr(objStr)
  const fetchUrl = `${AUTH_HOST}/setup/api/web/applications?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getAppByPage', payload: result.list})
        dispatch({type: 'getAppCount', payload: result.total})
      } else {
        dispatch({type: 'getAppByPage', payload: []})
        dispatch({type: 'getAppCount', payload: 0})
      }
      dispatch(setAppShowLoading(false))
    }).catch(err => {
      dispatch(setAppShowLoading(false))
      // message.error(err.message)
      logger.error(err)
    })
  }
}
export const getNewsPagesByPage = (page = 0, status, client) => {
  let objStr = {page, size: 5}
  if (client) {
    objStr['client'] = client
  }
  if (status === '0' || status === '1' || status === '2') {
    objStr['status'] = status
  }
  const endStr = jsonToParamStr(objStr)
  const fetchUrl = `${AUTH_HOST}/setup/api/web/newspages?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getNewsPagesByPage', payload: result.list})
        dispatch({type: 'getNewsPagesCount', payload: result.total})
      } else {
        dispatch({type: 'getNewsPagesByPage', payload: []})
        dispatch({type: 'getNewsPagesCount', payload: 0})
      }
      dispatch(setNewsPagesShowLoading(false))
    }).catch(err => {
      dispatch(setNewsPagesShowLoading(false))
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getRoleByPage = (page = 0, applicationCode) => {
  const endStr = applicationCode ? jsonToParamStr({'page': page, 'size': 5, applicationCode}) : jsonToParamStr({'page': page, 'size': 5})
  const fetchUrl = `${AUTH_HOST}/setup/api/web/roles?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getRoleByPage', payload: result.list})
        dispatch({type: 'getRoleCount', payload: result.total})
      } else {
        dispatch({type: 'getRoleByPage', payload: []})
      }
      dispatch(setRoleShowLoading(false))
    }).catch(err => {
      dispatch(setRoleShowLoading(false))
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getClientsByPage = (page = 0, clientId) => {
  let objStr = {page, size: 5}
  if (clientId) {
    objStr['clientId'] = clientId
  }
  const endStr = jsonToParamStr(objStr)
  const fetchUrl = `${AUTH_HOST}/setup/api/web/clients?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getClientsByPage', payload: result.list})
        dispatch({type: 'getClientsCount', payload: result.total})
      } else {
        dispatch({type: 'getClientsByPage', payload: []})
        dispatch({type: 'getClientsCount', payload: 0})
      }
      dispatch(setClientShowLoading(false))
    }).catch(err => {
      dispatch(setClientShowLoading(false))
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getClientsByQuery = (clientId = '') => {
  const endStr = jsonToParamStr({clientId})
  const fetchUrl = `${AUTH_HOST}/setup/api/web/clients?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getClientsByPage', payload: result.list})
        dispatch({type: 'getClientsCount', payload: result.total})
      } else {
        dispatch({type: 'getClientsByPage', payload: []})
      }
      dispatch(setClientShowLoading(false))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getUserByQuery = (username = '', phoneNumber = '') => {
  let endStr = ''
  if (username === '') {
    endStr = jsonToParamStr({phoneNumber})
  } else if (phoneNumber === '') {
    endStr = jsonToParamStr({username})
  } else {
    endStr = jsonToParamStr({username, phoneNumber})
  }
  // const endStr = jsonToParamStr({username, phoneNumber})
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list)) {
        dispatch({type: 'getUserByPage', payload: result.list})
        dispatch({type: 'getUserCount', payload: result.total})
      } else {
        dispatch({type: 'getUserByPage', payload: []})
        dispatch({type: 'getUserCount', payload: 0})
      }
      dispatch(setShowLoading(false))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getUserByUserName = (userName) => {
  const endStr = jsonToParamStr({'username': userName})
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result && result.list && !_.isEmpty(result.list) && result.list[0]['systemApplications']) {
        dispatch({type: 'getUserRolesByUserName', payload: result.list[0]['systemApplications']})
      } else {
        dispatch({type: 'getUserRolesByUserName', payload: []})
      }
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const getAllAppRoles = () => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/applications/roles`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result) {
        dispatch({type: 'getAllAppRoles', payload: result})
      } else {
        dispatch({type: 'getAllAppRoles', payload: []})
      }
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const getLoginUserInfo = () => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/user`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result) {
        dispatch({type: 'getLoginUserInfo', payload: result})
      }
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const getAppContentById = (id) => {
  const endStr = jsonToParamStr({id})
  const fetchUrl = `${AUTH_HOST}/setup/api/web/newspages/content?${endStr}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result !== null) {
        dispatch({type: 'showedAppContent', payload: result})
      } else {
        dispatch({type: 'showedAppContent', payload: ''})
      }
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const getAllAppClients = () => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/appclients`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result) {
        dispatch({type: 'getAllAppClients', payload: result})
      } else {
        dispatch({type: 'getAllAppClients', payload: []})
      }
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const addApp = (applicationCode, name) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/applications`
  const appParams = jsonToParamStr({
    applicationCode,
    name
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: appParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加项目成功！`)
      dispatch(getAppByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const addRole = (roleCode, roleName, applicationCode, description) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/roles`
  const roleParams = jsonToParamStr({
    roleCode,
    roleName,
    applicationCode,
    description
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: roleParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加角色成功！`)
      dispatch(getRoleByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const addNewsPages = (head, icon, pageContent, appClients = [], isPublish) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/newspages`
  let data = new FormData()
  data.append('head', head)
  data.append('icon', icon)
  data.append('pageContent', pageContent)
  data.append('clientIds', JSON.stringify(appClients))
  data.append('isPublish', isPublish)
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加App资讯成功！`)
      dispatch(getNewsPagesByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const updateNewsPages = (currentPage, newsId, head, icon, pageContent, appClients = [], isPublish) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/newspages`
  let data = new FormData()
  data.append('newsId', newsId)
  data.append('head', head)
  if (icon !== null) {
    data.append('icon', icon)
  }
  data.append('pageContent', pageContent)
  data.append('clientIds', JSON.stringify(appClients))
  data.append('isPublish', isPublish)
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`修改App资讯成功！`)
      dispatch(getNewsPagesByPage(currentPage - 1))
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const upAndDownNewsById = (id, isUp, currentPage) => {
  const appParams = jsonToParamStr({
    id,
    isUp
  })
  const fetchUrl = `${AUTH_HOST}/setup/api/web/newspages/sequence?${appParams}`
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'PUT',
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`调整顺序成功`)
      dispatch(getNewsPagesByPage(currentPage - 1))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const importDoctorFile = (file) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users/import/doctors`
  let data = new FormData()
  data.append('file', file)
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      dispatch({type: 'setImportLoading', payload: false})
      const {data} = json
      const errorLength = data.failedRows.length
      const errorRows = data.failedRows.join(',')
      const info = `处理成功${data.successedCount}条!
       处理失败${errorLength}条! 
       处理失败的行号为第${errorRows}行!`
      dispatch({type: 'setImportInfo', payload: info})
      dispatch({type: 'setImportInfoShow', payload: true})
      dispatch(getUserByPage(0))
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const resetImportStatus = () => {
  return (dispatch) => {
    dispatch({type: 'setImportInfo', payload: ''})
    dispatch({type: 'setImportInfoShow', payload: false})
  }
}

export const importPatientFile = (file) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users/import/patients`
  let data = new FormData()
  data.append('file', file)
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      dispatch({type: 'setImportLoading', payload: false})
      const {data} = json
      const errorLength = data.failedRows.length
      const errorRows = data.failedRows.join(',')
      const info = `处理成功${data.successedCount}条!处理失败${errorLength}条!处理失败的行号为第${errorRows}行`
      dispatch({type: 'setImportInfo', payload: info})
      dispatch({type: 'setImportInfoShow', payload: true})
      dispatch(getUserByPage(0))
    }).catch(err => {
      logger.error(err)
    })
  }
}

export const addGroup = (groupId, groupName, alias, identifier, systemApplications, image) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/groups`
  let data = new FormData()
  data.append('groupId', groupId)
  data.append('groupName', groupName)
  data.append('alias', alias)
  data.append('identifier', identifier)
  data.append('systemApplications', systemApplications)
  data.append('image', image)
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加组成功！`)
      dispatch(getGroupByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const addClient = (clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds,
  refreshTokenValiditySeconds, apiScopeName, clientRedirectUris, clientPostLogoutRedirectUris) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/clients`
  const clientParams = jsonToParamStr({
    clientId,
    clientSecret,
    clientName,
    idTokenValiditySeconds,
    accessTokenValiditySeconds,
    refreshTokenValiditySeconds,
    apiScopeName,
    clientRedirectUris,
    clientPostLogoutRedirectUris
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: clientParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加客户端成功！`)
      dispatch(getClientsByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const addUser = (username, password, phoneNumber, email, nickname, name, employer, department, title, groupRoles) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users`
  const userParams = jsonToParamStr({
    username,
    password,
    phoneNumber,
    email,
    nickname,
    name,
    employer,
    department,
    title,
    groupRoles
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: userParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加用户成功！`)
      dispatch(getUserByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const updateApp = (currentPage, id, applicationCode, name) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/applications`
  const appParams = jsonToParamStr({
    id,
    applicationCode,
    name
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      body: appParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`更新项目信息成功！`)
      dispatch(getAppByPage(currentPage - 1))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const updateRole = (currentPage, id, roleCode, roleName, application, description) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/roles`
  const roleParams = jsonToParamStr({
    id,
    roleCode,
    roleName,
    application,
    description
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      body: roleParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`更新角色信息成功！`)
      dispatch(getRoleByPage(currentPage - 1))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const updateGroup = (currentPage, fileChanged, id, groupId, groupName, alias, identifier, systemApplications, image) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/groups`
  let data = new FormData()
  data.append('id', id)
  data.append('groupId', groupId)
  data.append('groupName', groupName)
  data.append('alias', alias)
  data.append('identifier', identifier)
  data.append('systemApplications', systemApplications)
  if (fileChanged) {
    if (image) {
      data.append('image', image)
    } else {
      data.append('image', 'delete')
    }
  }
  return (dispatch) => {
    return fetch(fetchUrl, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`更新组信息成功！`)
      dispatch(getGroupByPage(currentPage - 1))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const updateClient = (currentPage, id, clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds,
  refreshTokenValiditySeconds, apiScopeName, clientRedirectUris, clientPostLogoutRedirectUris) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/clients`
  const clientParams = jsonToParamStr({
    id,
    clientId,
    clientSecret,
    clientName,
    idTokenValiditySeconds,
    accessTokenValiditySeconds,
    refreshTokenValiditySeconds,
    apiScopeName,
    clientRedirectUris,
    clientPostLogoutRedirectUris
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      body: clientParams,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`更新客户端信息成功！`)
      dispatch(getClientsByPage(currentPage - 1))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const updateUser = (currentPage, username, targetUserId, phoneNumber, email, nickname, name, employer, department, title, groupRoles = '') => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users`
  const userParams = jsonToParamStr({
    userId: '',
    targetUserId,
    phoneNumber,
    email,
    nickname,
    name,
    employer,
    department,
    title,
    groupRoles
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      credentials: 'include',
      body: userParams
    }).then(checkStatus).then((json) => {
      message.success(`修改用户成功！`)
      dispatch(getUserByPage(currentPage - 1))
      dispatch(getUserByUserName(username))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const modifySelfPass = (oldPassword, newPassword) => {
  const endStr = jsonToParamStr({oldPassword, newPassword})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/user/password?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('modify user enable successfully, return data:', json.data)
      message.success(`修改密码成功！`)
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const modifyPass = (targetUserId, newPassword) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/users/password`
  const userParams = jsonToParamStr({
    targetUserId,
    newPassword
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      credentials: 'include',
      body: userParams
    }).then(checkStatus).then((json) => {
      message.success(`修改密码成功！`)
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const modifyUserEnable = (targetUserId, enable, pageIndex) => {
  const endStr = jsonToParamStr({targetUserId, enable})
  const banState = enable ? '启用' : '禁用'
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/users/enable?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('modify user enable successfully, return data:', json.data)
      message.success(`用户${banState}成功！`)
      dispatch(getUserByPage(pageIndex))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const deleteUserById = (userId, userName) => {
  const endStr = jsonToParamStr({'targetUserId': userId})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/users?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('delete user successfully, return data:', json.data)
      message.success(`删除用户${userName}成功！`)
      dispatch(getUserByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const deleteAppById = (id, appName) => {
  const endStr = jsonToParamStr({id})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/applications?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('delete application successfully, return data:', json.data)
      message.success(`删除项目${appName}成功！`)
      dispatch(getAppByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const deleteRoleById = (id, roleName) => {
  const endStr = jsonToParamStr({id})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/roles?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('delete role successfully, return data:', json.data)
      message.success(`删除用户${roleName}成功！`)
      dispatch(getRoleByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const deleteNewsPageById = (id, title, status, client) => {
  const endStr = jsonToParamStr({id})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/newspages?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('delete newspages successfully, return data:', json.data)
      message.success(`下线${title}成功！`)
      dispatch(getNewsPagesByPage(0, status, client))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const deleteGroupById = (id, groupName) => {
  const endStr = jsonToParamStr({id})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/groups?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('delete group successfully, return data:', json.data)
      message.success(`删除组${groupName}成功！`)
      dispatch(getGroupByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const deleteClientById = (id, clientId) => {
  const endStr = jsonToParamStr({id})
  return (dispatch) => {
    return fetch(`${AUTH_HOST}/setup/api/web/clients?${endStr}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      credentials: 'include'
    })
    .then(checkStatus)
    .then(json => {
      logger.debug('delete client successfully, return data:', json.data)
      message.success(`删除客户端${clientId}成功！`)
      dispatch(getClientsByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

export const setBreadCrumb = (firstNav, secondNav) => {
  return (dispatch) => {
    dispatch({type: 'setFirstNav', payload: firstNav})
    dispatch({type: 'setSecondNav', payload: secondNav})
  }
}
// 添加栏目
export const addColumns = (proId, title) => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/columns`
  const columnData = jsonToParamStr({
    proId,
    title
  })
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: columnData,
      credentials: 'include'
    }).then(checkStatus).then((json) => {
      message.success(`添加栏目成功！`)
      // dispatch(getUserByPage(0))
    }).catch(err => {
      // message.error(err.message)
      logger.error(err)
    })
  }
}

// 获取栏目列表
export const getColumns = () => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/columns`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      console.log('columnListData========', result)
    }).catch(err => {
      message.error(err.message)
      logger.error(err)
    })
  }
}

// 获取左侧菜单
export const getLeftMenu = () => {
  const fetchUrl = `${AUTH_HOST}/setup/api/web/menu`
  return (dispatch) => {
    return fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(checkStatus).then(json => {
      const result = json.data
      if (result) {
        dispatch({type: 'getMenuList', payload: result})
      } else {
        dispatch({type: 'getMenuList', payload: []})
      }
    }).catch(err => {
      message.error(err.message)
      logger.error(err)
    })
  }
}
