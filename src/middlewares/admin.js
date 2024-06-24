const jwt = require('jsonwebtoken');
const db = require('../models/db');

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!authorization.startsWith('Bearer')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.jwt_SECRET);

        const user = await db.user.findFirst({ where: { user_id: payload.id } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        delete user.password;
        req.user = user;

        next(); // เรียก next() เพื่อส่งต่อให้ Route handler ทำงานต่อไป

    } catch (err) {
        next(err);
    }
};
