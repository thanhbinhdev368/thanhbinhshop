const keytokenModel = require("../models/keytoken.model")

class KeyTokenService {
    static createKeyToken = async({userId, publicKey, privateKey, refreshToken}) => {
const filter = {
    user: userId
}
const update = {
    publicKey,
    privateKey,
    refreshTokenUsed: [],
    refreshToken
}
const options = {
    upsert: true,
    new: true
}
const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)
return tokens
} 
    }

module.exports = {
    KeyTokenService
}