const app = require('./src/app')
const dotenv = require("dotenv")
dotenv.config()
const server = app.listen(process.env.PORT, () =>{
    console.log('server running' );
})
process.on('SIGINT', () => {
    server.close(() => {
console.log('exit server');
    })
})