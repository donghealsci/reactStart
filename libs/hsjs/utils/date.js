import {mandatory} from 'utils'
const millisecondsOfOneDay = 86400000
const millisecondsOfOneHour = 3600000
const millisecondsOfOneMinute = 60000

export const getSmartTime = (datetime = mandatory()) => {
  const time = new Date(datetime)
  const startOfToday = getStartOfADay(Date.now())
  const gap = datetime - startOfToday
  if (gap >= 0) {
    return time.toTimeString().slice(0, 5)
  }
  if (gap >= -millisecondsOfOneDay) {
    return '昨天'
  }
  if (gap >= -millisecondsOfOneDay * 2) {
    return '前天'
  }
  return time.toLocaleDateString()
}

const getStartOfADay = (datetime = mandatory()) => {
  const time = new Date(datetime)
  time.setHours(0)
  time.setMinutes(0)
  time.setSeconds(0)
  time.setMilliseconds(0)

  return time.valueOf()
}
/**
 *
 * @param {*} datetime
 * @param {*} locale  ['zh' | 'cn']
 */
export const formatDate = (datetime, locale) => {
  if (datetime === undefined || datetime === null || typeof datetime !== 'number') {
    return 'Invalid Date'
  }
  const date = new Date(datetime)
  switch (locale) {
    case 'zh':
      return zhDateFormater(date)
    case 'en':
      return enDateFormater(date)
    default:
      return date.toLocaleDateString()
  }
}

/**
 *
 * @param {*} datetime
 * @param {*} locale  ['zh' | 'cn']
 */
export const formatTime = (datetime, locale) => {
  if (datetime === undefined || datetime === null || typeof datetime !== 'number') {
    return 'Invalid Date'
  }
  const date = new Date(datetime)
  switch (locale) {
    case 'zh':
      return `${zhDateFormater(date)} ${timeFormater(date)}`
    case 'en':
      return `${enDateFormater(date)} ${timeFormater(date)}`
    default:
      return `${date.toLocaleDateString()} ${timeFormater(date)}`
  }
}

const zhDateFormater = (date = mandatory()) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

const enDateFormater = (date = mandatory()) => {
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return `${date.getFullYear()}-${month}-${day}`
}

const timeFormater = (date = mandatory(), precise = false) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return precise
    ? `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    : `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

export const formatDuration = (milliseconds = mandatory(), locale) => {
  if (milliseconds === undefined || milliseconds === null || typeof milliseconds !== 'number') {
    return 'Invalid Time'
  }
  let result = `${milliseconds}`
  const hours = parseInt(result / millisecondsOfOneHour)
  const minutes = parseInt((result - hours * millisecondsOfOneHour) / millisecondsOfOneMinute)
  const seconds = Math.round((result - hours * millisecondsOfOneHour - minutes * millisecondsOfOneMinute) / 1000)
  switch (locale) {
    case 'zh':
      if (milliseconds === 0) {
        result = '0秒'
      } else {
        result = `${hours ? hours + '小时' : ''}` +
          `${minutes || (hours && minutes) ? minutes + '分' : ''}` +
          `${seconds ? seconds + '秒' : ''}`
      }
      break
    case 'en':
      result = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      break
    default:
      break
  }
  return result
}
