// 封裝一個參數mineReadFile讀取文件內容
// 參數 path文件路徑
// 返回 promise對象

function mineReadFile(path) {
    return new Promise((reslove, reject) => {
        require('fs').readFile(path, (err, data) => {
            if (err) reject(err);

            reslove(data);
        })
    })
}
//執行 node test3.js
//因為是promise對象所以有返回可以用then
mineReadFile('./resource/content.txt')
    .then(value => {
        console.log(value.toString());
    }, reason => {
        console.log(reason);
    })