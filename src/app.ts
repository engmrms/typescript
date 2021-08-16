let arrs:Array<string | number> = []
arrs = [5,6,7]
arrs = ["D","C",7]

function merge<T extends object,U extends object> (a:T,b:U){

    return Object.assign(a,b);
}

const mergedValue = merge({name:"mohammad"},{age:20})
const mergedValue2 = merge({name:"mohammad",hobbies:["sports"]},{age:20})
console.log(mergedValue.age)