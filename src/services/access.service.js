const shopModel = require("../models/shop.model")
const bcrypt = require('bcryptjs')
const crypto = require('node:crypto')
const { createTokenPair} = require('../auth/authUtils')
const {getInfoData} = require('../utils')
const { KeyTokenService } = require("./keyToken.service")
const { BadRequestError, AuthFailureError } = require("../core/Error.response")
const { findByEmail } = require("./shop.service")
const RoleShop = {
SHOP: 'SHOP',
WRITER: 'WRITER',
EDITOR: 'EDITOR',
ADMIN: 'ADMIN'
}
class AccessService {
    static logIn = async({email, password, refreshToken = null}) => {
const foundShop = await findByEmail({email})
if(!foundShop) { throw new BadRequestError('Shop not registered')}
const match = bcrypt.compareSync(password, foundShop.password)
if(!match) { throw new AuthFailureError('Authentication Error') }
const privateKey = crypto.randomBytes(64).toString('hex')
const publicKey = crypto.randomBytes(64).toString('hex')
const tokens = await createTokenPair({userId: foundShop._id, email}, publicKey, privateKey)
await KeyTokenService.createKeyToken({userId: foundShop._id, refreshToken: tokens.refreshToken, privateKey, publicKey })
return {
    shop: getInfoData({fields: ['_id', 'name', 'email'], object: foundShop}),
    tokens
}
} 

static signUp = async ({name, email, password}) => {
    
        const holdelShop = await shopModel.findOne({email}).lean()
        if(holdelShop) {
            throw new BadRequestError('Error: shop already registered')
        }
        const salt = await bcrypt.genSalt(10)
      
        const passwordHash = await bcrypt.hash(password, salt)
        console.log('password', passwordHash)
        const newShop =   new shopModel({
            name, email, password: passwordHash, roles: RoleShop.SHOP
        })
    
       await newShop.save()
        if(newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')
            const keyStore = await KeyTokenService.createKeyToken({userId: newShop._id, publicKey, privateKey})
            if(!keyStore) throw new BadRequestError('keyStore error')
            const tokens = await createTokenPair({userId: newShop._id, email}, keyStore.publicKey, keyStore.privateKey)
            return {
                shop: getInfoData({fields: ['_id', 'name', 'email'], object: newShop}),
                tokens,
            }
        }
    }
}

module.exports = AccessService
