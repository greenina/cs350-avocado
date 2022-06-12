
export const checkstat = (x) => {
    if (x == null) return '#ffffff' 
    else if(x===2) return '#eb4d4b'
    else if (x===1) return '#ffff00'
    else if(x===0) return '#6ab04c'
    else return '#ffffff' 
}
export const getScope = (l, pos) => {
    var result = []
    var temp = 0
    var temp_stat = checkstat(l[0])
    for(var i=0;i<l.length;i++){
        if(pos === i+1 && pos!=0){
            result.push({num:temp, stat:temp_stat})
            result.push({num:1, stat:'#000000'})
            temp = 1
            temp_stat = checkstat(l[i+1])
        }
        if(checkstat(l[i]) === temp_stat){
            temp = temp + 1
        } else {
            result.push({num:temp, stat:temp_stat})
            temp = 1
            temp_stat = checkstat(l[i])
        }
    }
    result.push({num:temp, stat:temp_stat})
    return result
}
