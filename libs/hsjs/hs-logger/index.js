'use stric'
import Logger from './logger'
import LEVELS from './levels'

let _level = 'ALL'
const defaulLogger = new Logger(_level)      //the singleton default logger with out any category,
const categoriedLoggers = {}                 //loggers with category

const setLevel = (level: string) => {
    if(!LEVELS[level])
        throw new Error(`${level} is not a valid level name in hsLogger`)
    else{
        _level = level
        defaulLogger.setLevel(_level)
        for(const logger in categoriedLoggers){    
            categoriedLoggers[logger].setLevel(_level)
        }
    }

}

const getLevel = ():string => {
    return _level
}

const getLogger = (category:string):Logger => {
    if(!category){
        return defaulLogger
    }
    else if(typeof category !== 'string')
        throw new Error('category should be a string')
    else if(categoriedLoggers[category]){
        return categoriedLoggers[category]
    }
    else {
        const logger = new Logger(_level, category)
        categoriedLoggers[category] = logger
        return logger
    }
}

const hsLogger = {
    setLevel,
    getLevel,
    getLogger
}

export default hsLogger
