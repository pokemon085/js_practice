/*
resource 1.html 2.html 3.html 文件內容
*/
const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

//回調函數的方式 node test2.js
// fs.readFile('./resource/1.html',(err,data1)=>{
//     if(err) throw err;
//     fs.readFile('./resource/2.html',(err,data2)=>{
//         if(err) throw err;
//         fs.readFile('./resource/3.html',(err,data3)=>{
//             if(err) throw err;
//             console.log(data1+data2+data3);
//         })
//     })
// })

//async await實現
async function main() {
    //await後面接promise內容
    try {
        let data1 = await mineReadFile('./resource/1.html');
        let data2 = await mineReadFile('./resource/2.html');
        let data3 = await mineReadFile('./resource/3.html');
        console.log(data1 + data2 + data3);
    } catch (e) {
        console.log(e.code);

        // errno: -4058,
        // code: 'ENOENT',
        // syscall: 'open',
        // path: 'T:\\pikaaaaaaaaaaaaaaaaaaaa\\f\\js_practice\\js_promise\\async\\resource\\1z.html'
    }


}
main()