//聲明構造函數
function Promise(executor) {
    //添加屬性
    this.PromiseState = 'pending';
    this.PromiseResult = null;

    //聲明屬性
    this.callback = {};

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

        //調用成功的回調函數
        if(self.callback.onResolved){
            self.callback.onResolved(data);
        }
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
        if(self.callback.onReject){
            self.callback.onReject(data);
        }

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
    if (this.PromiseState === 'fulfilled') {
        onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'reject') {
        onReject(this.PromiseResult);
    }

    //判斷pending狀態
    if (this.PromiseState === 'pending') {
        //保存回調函數
        this.callback = {
            onResolved: onResolved,
            onReject: onReject
        }
    }

}