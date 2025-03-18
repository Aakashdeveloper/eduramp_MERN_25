let fs = require('fs');

// fs.writeFile('myCode.txt','My Developer Funnel',(err)=>{
//     if(err) throw err;
//     console.log('File Created')
// })


// fs.appendFile('myCode1.txt','My Developer Funnel \n',(err)=>{
//     if(err) throw err;
//     console.log('File Created')
// })

// fs.readFile('myCode1.txt','utf-8',(err,data) => {
//     if(err) throw err
//     console.log(data)
// })

// fs.unlink('myCode.txt',(err)=>{
//     if(err) throw err
//     console.log('File Deleted')
// })

fs.rename('myCode1.txt','myCode2.txt',(err) => {
    if(err) throw err
    console.log('File Renamed')
})