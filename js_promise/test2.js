// source =>https://www.youtube.com/watch?v=_uuouWGIFDk&list=PLmOn9nNkQxJF-I5BK-wNUnsBkuLXUumhr&index=5
//執行 node 檔名
const fs = require('fs')

//----回調函數 形式-----
// fs.readFile('./resource/content.txt',(err,data)=>{
//     //如果錯 拋出錯誤
//     if(err) throw err;
//     console.log(data.toString())
// })

//promise 形式
const p = new Promise((reslove, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        if (err) reject(err);  //測試失敗 可以把匯入的檔名寫錯
        reslove(data)
    })
})

//調用 then
p.then((value) => {
    console.log(value.toString())
}, (reason) => {
    console.log(reason)
})