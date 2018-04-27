
const jwt = require('jsonwebtoken');
var Routes = function() {};

Routes.apiKey = (req, res, next) => {
    if (!req.headers['x-api-key']) {
        res.status(401).send('Unauthorized')
        return;
    } 
    next()
}


Routes.access = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send({ token: null, user: null, message: 'Failed to authenticate token.' })
        return;
    }
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (err) return res.status(500).send({ token: null, user: null, message: 'Failed to authenticate token.' });
        req.user = decoded;
        next();
      });
}

module.exports = Routes;