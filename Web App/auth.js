const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded.userId;
        next();
    } catch (e) {
        res.status(401).send({ message: 'Unauthorized' });
    }
};

module.exports = auth;