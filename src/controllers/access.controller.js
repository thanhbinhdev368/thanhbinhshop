const {signUp} = require('../services/access.service')
const { OK, Created} = require('../core/success.response')
const AccessService = require('../services/access.service')
class AccessController {
    login = async(req, res,next) => {
        new OK({
            metadata: await AccessService.logIn(req.body)
        }).send(res)
    }
signUp = async (req, res, next) => {
new Created({message: 'register OK', metadata: await signUp(req.body)}).send(res)
    }
}
module.exports = new AccessController()