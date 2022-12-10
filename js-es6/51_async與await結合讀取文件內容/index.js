const fs=require("fs");


const readA=()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile("./aa.txt",(err,data)=>{
            if(err) reject(err);

            resolve(data)
        })
    })
}


const readB=()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile("./bb.txt",(err,data)=>{
            if(err) reject(err);

            resolve(data)
        })
    })
}

const readC=()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile("./cc.txt",(err,data)=>{
            if(err) reject(err);

            resolve(data)
        })
    })
}


const main=async()=>{
    try{
       let a=await readA();
       let b= await readB();
       let c= await readC();

       console.log(a.toString());
       console.log(b.toString());
       console.log(c.toString());
      
      
    }catch(e){
        console.log(e)
    }
}

main();