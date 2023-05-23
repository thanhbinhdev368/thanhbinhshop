const keytokenModel = require("../models/keytoken.model")

class KeyTokenService {
    static createKeyToken = async({userId, publicKey, privateKey}) => {
try {
const keyStore = await keytokenModel.create({
    user: userId,
    publicKey,
    privateKey
})
return keyStore
} catch(err){
return err
}
    }
}
module.exports = {
    KeyTokenService
}