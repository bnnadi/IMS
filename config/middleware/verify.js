
const jwt = require('jsonwebtoken');

const db = require(BACKEND + '/models');
var EmployeeModel = db.employee;

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
        if (err || !decoded) return res.status(500).send({ isValid: false, token: null, user: null, message: err.message });
  
        req.user = {
            '_id': decoded._id,
            'permission_level_code': decoded.permission_level_code
        };
        next();
      });
}

module.exports = Routes;