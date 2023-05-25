const jwt = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
try {
const accessToken = jwt.sign(payload, publicKey, {
    expiresIn: '6h'
})
const refreshToken = jwt.sign(payload,privateKey, {
    expiresIn: '10 days'
})
return {accessToken, refreshToken}
}
catch(err) {

}
}

module.exports = {
    createTokenPair}