const {signUp} = require('../services/access.service')
class AccessController {
signUp = async (req, res, next) => {
    try {
return res.status(201).json({
    code: 'xxx',
    metadata: await signUp(req.body)
})
    }
    catch(err) {
next(err)
    }
}
}
module.exports = new AccessController()