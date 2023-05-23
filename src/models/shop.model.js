const {model, Schema, Types} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        maxLength: 150
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
   },
    status:{
        type: String,
        required:true,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Boolean,
        default: false
    },
    roles: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);