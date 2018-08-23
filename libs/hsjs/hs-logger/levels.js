//@flow
'use strict'

class Level {
    _val: number
    _name: string
    constructor(level:number, name:string){
        this._val = level
        this._name = name
    }
    isNoHigherThan(otherLevel:{val: number, name: string}):boolean {
        return this._val <= otherLevel._val
    }
    isNoLowerThan(otherLevel:{val: number, name: string}):boolean {
        return this._val >= otherLevel._val
    }
    isEqualTo(otherLevel:{val: number, name: string}):boolean {
        return this._val == otherLevel._val
    }
}


/*
*  borrow from log4js
*/
const defaultLevels = {
    ALL: new Level(Number.MIN_VALUE, 'ALL'),
    TRACE: new Level(5000, 'TRACE'),
    DEBUG: new Level(10000, 'DEBUG'),
    INFO: new Level(20000, 'INFO'),
    WARN: new Level(30000, 'WARN'),
    ERROR: new Level(40000, 'ERROR'),
    ASSERT: new Level(40000, 'ASSERT'),        //the same value with ERRRO level
    FATAL: new Level(50000, 'FATAL'),
    MARK: new Level(9007199254740992, 'MARK'), // 2^53
    OFF: new Level(Number.MAX_VALUE, 'OFF')
}

export default defaultLevels
