const mongoose = require("mongoose")
const connectString = `mongodb://127.0.0.1:27017/thanhbinhshop`

class Database {
    constructor() {
        this.connect()
    }
    connect(type= 'mongodb') {
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then((result) => {
            console.log('connected mongodb success');
        }).catch((err) => {
            console.log('error connect');
        });
    }
    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance

    }
    
}
const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb