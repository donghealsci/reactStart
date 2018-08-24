import * as helper from './action-helper'
import 'whatwg-fetch'
import {userManager, generateUUID} from 'utils'
import {message} from 'antd'
const {checkStatus, jsonToParamStr, logger} = helper
const utils = require('utility')
// const HOST = 'https://communitydev.healscitech.com'
const {HOST, AUTH_HOST} = globalConfig.default

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
