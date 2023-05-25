const HEADERS = {
    API_KEY : 'x-api-key',
}
const { findById} = require('../services/apiKey.service')
const apiKey = async(req, res, next) =>{
    try {
const key = req.headers[HEADERS.API_KEY]?.toString()
if(!key) {
    return res.status(403).json(
    {
        message: 'forbidden'
    }
    )
}
const objectKey = await findById(key)
if(!objectKey){return res.status(403).json(
    {
        message: 'forbidden'
    }
    )
    } 
    req.objectKey = objectKey
    return next()
}

    catch(err) {

    }
}
const permission = (permission) =>{
return (req, res, next) => {
    if(!req.objectKey.permissions) {
        return res.status(403).json(
            {
                message: 'permission denied'
            }
            )
    }
    const validPermission = req.objectKey.permissions.includes(permission)
    if(!validPermission) { return res.status(403).json(
        {
            message: 'permission denied'
        }
        )}
        return next()

        
}
}
const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}
module.exports = {
    asyncHandler,
    permission,
    apiKey
}