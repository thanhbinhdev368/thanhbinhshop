const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const { createTokenPair} = require('../auth/authUtils')
const {getInfoData} = require('../utils')
const { KeyTokenService } = require("./keyToken.service")
const RoleShop = {
SHOP: 'SHOP',
WRITER: 'WRITER',
EDITOR: 'EDITOR',
ADMIN: 'ADMIN'
}
class AccessService {
static signUp = async ({name, email, password}) => {
    try {
        const holdelShop = await shopModel.findOne({email}).lean()
        if(holdelShop) {
            return {
                code: 'xxxx',
                message: 'Shop already registered'
            }
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name, email, passwordHash, roles: RoleShop.SHOP
        })
        if(newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = cryptor.randomBytes(64).toString('hex')
            const keyStore = await KeyTokenService.createKeyToken({userId: newShop._id, publicKey, privateKey})
            if(!keyStore) return {
                code: 'xxx',
                message: 'keyStore error'
            }
            const tokens = await createTokenPair({userId: newShop._id, email}, keyStore.publicKey, keyStore.privateKey)
            return {
                shop: getInfoData({fields: ['_id', 'name', 'email'], object: newShop}),
                tokens
            }
        }
    }
    catch(err) {
        return {
            code: 'xxx',
             message: err.message,
             status: 'err'
        }
    }
}
}
module.exports = AccessService