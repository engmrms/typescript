let arrs:Array<string | number> = []
arrs = [5,6,7]
arrs = ["D","C",7]

function merge<T extends object,U extends object> (a:T,b:U){

    return Object.assign(a,b);
}

const mergedValue = merge({name:"mohammad"},{age:20})
const mergedValue2 = merge({name:"mohammad",hobbies:["sports"]},{age:20})
console.log(mergedValue.age); 


// function extractAndConvert<T extends object,U extends keyof T >(objA:T , key:U) {
function extractAndConvert<T extends object >(objA:T , key:keyof T) {

    console.log("object value: "+objA[key])
}
extractAndConvert({name:"mohammd"},"name");


class DataSorage<T>{
    private data:T[] =[];
    addItem (item:T) {
        this.data.push(item)
    };
    removeItem (item:T){
        if(this.data.indexOf(item) ===-1) return ;
        this.data.splice(this.data.indexOf(item),1);
    }
    getItem(){
        return this.data
    }
}
const textStorage = new DataSorage<string>();
textStorage.addItem("max")
textStorage.addItem("manu")
console.log(textStorage);
const numberStorage = new DataSorage<number>();
numberStorage.addItem(5)
numberStorage.addItem(7)
console.log(numberStorage);
const objStorage = new DataSorage<object>();
// const objj= {name1:"mohammd"};
// objStorage.addItem(objj)
// objStorage.addItem({name1:"saleh"})
// objStorage.removeItem(objj)
// console.log(objStorage);

const names:Readonly<string[]> = ["mohammd","saleh"];
// names.push("rabah")
// names.pop()

interface PersonalCard {
    firstname:string;
    lastname:string;
    age:number
}

function createPeroanlCard(fname:string,lname:string,agr:number):PersonalCard{
    let personalcard:Partial<PersonalCard> ={};
    personalcard.firstname = fname;
    personalcard.lastname = lname;
    personalcard.age = age;
    return personalcard as PersonalCard;
}