const app = require('./src/app')
const server = app.listen(3066, () =>{
    console.log('server running on port 3066');
})
process.on('SIGINT', () => {
    server.close(() => {
console.log('exit server');
    })
})