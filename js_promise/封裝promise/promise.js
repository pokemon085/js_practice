//聲明構造函數
function Promise(executor){
    //添加屬性
    this.PromiseState='pending';
    this.PromiseResult=null;

    //保存實例對象的this的值
    const self=this;
    //resolve
    function resolve(data){
        //1.修改對象的狀態(promiseState)
        self.PromiseState='fulfilled';

        //2.設置對象結果值(promiseResult)
        self.PromiseResult=data;
    }
    //reject
    function reject(data){
        //1.修改對象的狀態(promiseState)
        self.PromiseState='reject';

        //2.設置對象結果值(promiseResult)
        self.PromiseResult=data;

    }

    executor(resolve,reject);
}

//添加then方法 因為沒有then方法 直接呼叫會報錯(p.then is not a function)
Promise.prototype.then=function(onResolved,onReject){

}