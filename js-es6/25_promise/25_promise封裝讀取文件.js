//引入fs模塊
const fs=require('fs');

// fs.readFile('./text.txt',(err,data)=>{
//     if(err) throw err;

//     console.log(data.toString())
// })

const p=new Promise((resolve,reject)=>{
    fs.readFile('./text.txat',(err,data)=>{
        if(err) reject(err);

        resolve(data);
    })
})

p.then((value)=>{
    console.log('ok='+value.toString())
},(reason)=>{
    console.log('error')
})