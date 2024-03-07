const jwt = require('jsonwebtoken')
const db = require('../models/db')

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        // console.log(authorization)
        if (!authorization) {
            throw new Error ('Unauthorized')
        }
        if(!(authorization.startsWith('Bearer'))) {
            throw new Error('Uanuthorized')
        }
        const token = authorization.split(' ')[1]
        payload = jwt.verify(token,process.env.jwt_SECRET)
        // console.log(payload)

        const user = await db.user.findFirst({where : {user_id: payload.id}})
        delete user.password
        // console.log(user)
        req.user = user
        res.json(req.user)
        next()
        
    }catch(err) {
        next(err)
    }
}