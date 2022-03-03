//聲明構造函數
function Promise(executor) {
    //添加屬性
    this.PromiseState = 'pending';
    this.PromiseResult = null;

    //聲明屬性
    this.callbacks = [];

    //保存實例對象的this的值
    const self = this;
    //resolve
    function resolve(data) {
        //確保狀態只能更改一次
        if (self.PromiseState !== 'pending') return;

        //1.修改對象的狀態(promiseState)
        self.PromiseState = 'fulfilled';

        //2.設置對象結果值(promiseResult)
        self.PromiseResult = data;

        //調用成功的回調函數(用foreach是因為會有多個then的時候)
        self.callbacks.forEach(item => {
            item.onResolved(data);
        });

    }
    //reject
    function reject(data) {
        //確保狀態只能更改一次
        if (self.PromiseState !== 'pending') return;

        //1.修改對象的狀態(promiseState)
        self.PromiseState = 'reject';

        //2.設置對象結果值(promiseResult)
        self.PromiseResult = data;

        //調用失敗的回調函數
        self.callbacks.forEach(item => {
            item.onReject(data);
        });

    }
    try {
        //同步調用
        executor(resolve, reject);
    } catch (e) {
        //修改promise 對象狀態為失敗
        reject(e);
    }

}

//添加then方法 因為沒有then方法 直接呼叫會報錯(p.then is not a function)
Promise.prototype.then = function (onResolved, onReject) {

    const self = this;

    //判斷回調函數參數
    if (typeof onReject !== 'function') {
        onReject = reason => {
            throw reason;
        }
    }
    //判斷沒傳值
    if (typeof onResolved != 'function') {
        onResolved = value => value; //value=>{return value}
    }
    return new Promise((resolve, reject) => {

        //封裝函數
        function callback(type) {
            try {
                //獲取回調函數的執行結果
                let result = type(self.PromiseResult);
                //判斷是否為Promise類型的對象
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })

                } else {
                    //結果的對象狀態為成功
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }

        }
        if (this.PromiseState === 'fulfilled') {
            callback(onResolved);
        }
        if (this.PromiseState === 'reject') {
            callback(onReject);
        }

        //判斷pending狀態
        if (this.PromiseState === 'pending') {
            //保存回調函數
            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onReject: function () {
                    callback(onReject);
                }
            })
        }
    })



}

//添加then方法
Promise.prototype.catch = function (onReject) {
    //直接調用上面的then方法
    return this.then(undefined, onReject);
}

//添加resolve方法
Promise.resolve = function (value) {
    //返回promise對象
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        } else {
            //狀態設為成功
            resolve(value);
        }
    })
}

//添加reject方法
Promise.reject = function (value) {

    return new Promise((resolve, reject) => {
        reject(value)
    })

}

//添加all方法
Promise.all = function (promises) {
    //返回結果為promise對象
    return new Promise((resolve, reject) => {
        let count = 0;
        let arr=[];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                arr[i]=v;
                count++;
                if (count === promises.length) {
                    resolve(arr)
                }
            }, r => {
                reject(r)
            })
        }
    })
}