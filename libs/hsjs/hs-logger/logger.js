
// 'use stric'
import LEVELS from './levels'

export default class Logger {
    _level: {val: number, name: string, isNoHigherThan: Function}
    _loggerHandler: {}
    _category: string
    constructor(level: string, category: string) {
        this._level = LEVELS[level] || LEVELS.ALL
        this._loggerHandler = console
        this._category = category || ''
    }
    setLevel(level: string){
        if(!LEVELS[level])
            throw new Error(`${level} is not a valid level name in hsLogger`)
        else
            this._level = LEVELS[level]
    }
    getPrefix(type){
        let time = new Date(),
            timeStamp = `${time.toLocaleString()}`

        return `[${timeStamp}] [${type}] ${this._category} - `
    }
    debug(...args){
        const content = args || []
        if(LEVELS['DEBUG'].isNoLowerThan(this._level)){
            this._loggerHandler.debug(this.getPrefix('DEBUG'), ...content)
        }
    }
    trace(...args){
        const content = args || []
        if(LEVELS['TRACE'].isNoLowerThan(this._level)){
            this._loggerHandler.trace(this.getPrefix('TRACE'), ...content)
        }
    }
    info(...args){
        const content = args || []
        if(LEVELS['INFO'].isNoLowerThan(this._level)){
            this._loggerHandler.info(this.getPrefix('INFO'), ...content)
        }
    }
    warn(...args){
        const content = args || []
        if(LEVELS['ERROR'].isNoLowerThan(this._level)){
            this._loggerHandler.warn(this.getPrefix('WARN'), ...content)
        }
    }
    error(...args){
        const content = args || []
        if(LEVELS['ERROR'].isNoLowerThan(this._level)){
            this._loggerHandler.error(this.getPrefix('ERROR'), ...content)
        }
    }
    assert(...args){
        const content = args || []
        if(LEVELS['ASSERT'].isNoLowerThan(this._level)){
            this._loggerHandler.assert(this.getPrefix('ASSERT'), ...content)
        }
    }
}
