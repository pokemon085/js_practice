
//需按照順序讀取

//引入fs模塊
const fs=require('fs');

const p=new Promise((resolve,reject)=>{
    fs.readFile('./aa.txt',(err,data)=>{
        resolve(data)
    })
});

p.then(value=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./bb.txt',(err,data)=>{
            resolve([value,data])
        })
    })
}).then(value=>{
    //value=>上面[value,data]

    return new Promise((resolve,reject)=>{
        fs.readFile('./cc.txt',(err,data)=>{
            value.push(data);
            resolve(value);
        })
    })
}).then(value=>{
    console.log(value.toString())
})