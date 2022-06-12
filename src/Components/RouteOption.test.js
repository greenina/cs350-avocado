import { checkstat, getScope } from "./RouteOptionfunc";


test ("checkstat, x = 0", ()=>{
    expect(checkstat(0)).toBe("#6ab04c");
})
test ("checkstat, x = 1", ()=>{
    expect(checkstat(1)).toBe("#ffff00");
})
test ("checkstat, x = 2", ()=>{
    expect(checkstat(2)).toBe("#eb4d4b");
})
test ("checkstat, x = 3", ()=>{
    expect(checkstat(3)).toBe("#ffffff");
})
test ("checkstat, x = null", ()=>{
    expect(checkstat(null)).toBe("#ffffff");
})

let route = [0,1,2,null];
let pos = 0;
let getScope_0 = getScope(route, pos);

test ("test getScope pos = 0", ()=>{
    expect(getScope_0.length).toBe(4);
    expect(getScope_0[0].num).toBe(1);
})
pos =1
let getScope_1 = getScope(route, pos);

test ("test getScope pos = 1",()=>{
    expect(getScope_1.length).toBe(7);
    expect(getScope_1[0].num).toBe(0);
    expect(getScope_1[1].num).toBe(1);
})


