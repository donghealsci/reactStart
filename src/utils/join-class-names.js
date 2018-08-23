//join classnames
//eg, joinClassNames('classNameA', 'classNameB') -> 'ClassNameA ClassNameB'
const joinClassNames = (...args) => {
    //TODO: sanity check
    args.map((arg) => {
        if(arg == null)
            arg = ''
    })
    var ouput = Array.prototype.join.call(args, ' ')
    return ouput.trim()
}

export default joinClassNames
