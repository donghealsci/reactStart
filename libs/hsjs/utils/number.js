import {mandatory} from 'utils'

export const formatCount = (num = mandatory()) => {
    if(typeof num !== 'number') {
        throw new Error('only number is allowed as input')
    }
    let result = num
    if(result >= 1000 && result < 10000) {
        result = result.toString()
        result = addComma(result)
    }
    else if(result >= 10000 && result < 100000000) {
        result /= 10000
        result = addComma(Math.floor(result * 10)/10)
        result += '万'
    }
    else if(result >= 100000000) {
        result /= 100000000
        result = addComma(Math.floor(result * 10)/10)
        result += '亿'
    }
    return result.toString()
}

export const addComma = number => {
    const temp = number.toString().split('.')
    const tail = temp[1] ? '.' + temp[1] : ''
    let result = temp[0] || ''
    const subs = []
    while(result.length >= 4) {
        subs.unshift(result.substr(result.length - 3))
        result = result.substr(0, result.length - 3)
    }
    
    subs.unshift(result)
  
    return subs.join(',') + tail
}