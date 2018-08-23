// @flow
import {appLogger} from 'utils'
import { message } from 'antd'
export const logger = appLogger.getLogger('Action')

const errorCode = {
  OK: '000000'
}

/* action helper functions */
export const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return parseJSON(resp)
      .then(checkSystemError)
  } else if (resp.status.toString() === '401') {
    message.error('登录过期，页面将会刷新')
    window.location.reload()
  } else {
    return parseJSON(resp).then((res) => {
      message.error(res.status.userMessage)
      throw new Error(res.status.userMessage)
    })
  }
}

export const parseJSON = (resp) => {
  return resp.json()
}

export const checkSystemError = (resp) => {
  if (!resp.status || resp.status.code === errorCode.OK) {
    return resp
  } else {
    message.error(`${resp.status.userMessage}`)
    const error = new Error(`${resp.status.code} ${resp.status.message} ${resp.status.userMessage}`)
    throw error
  }
}

/**
 * Convert json to x-www-form-urlencoded query string
 */
export const jsonToParamStr = (json) => {
  let result = ''
  result = _.map(json, (val, key) => {
    return `${key}=${val === undefined || val === null ? '' : val}&`
  })
  .join('')

  if (result[result.length - 1] === '&') {
    result = result.slice(0, result.length - 1)
  }
  return result
}
