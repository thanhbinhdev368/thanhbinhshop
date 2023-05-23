const mongoose = require("mongoose")
const os = require("os")
const process = require("process")
const countConnect = () =>{
    const numConnection = mongoose.connections.length
    console.log(
        `number of connections ${connections}`
    );
}
const checkOverload = () => {
    setInterval(() => {
const numConnection = mongoose.connection.length
const numCores = os.cpus().length
const memoryUsage = process.memoryUsage().rss
const maxConnections = numCores * 5
console.log(`active conection ${numConnection}`);
console.log(`memoryUsage ${memoryUsage/1024/1024} MB`);
if(numConnection > maxConnections) {
    console.log('conection overload deteted');
}
    }) //monitor every 5 seconds
}
module.exports = {
countConnect,
checkOverload
}