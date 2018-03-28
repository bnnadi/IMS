var Routes = function() {};

Routes.apiKey = (req, res, next) => {
    if (!req.headers['x-api-key']) {
        res.status(401).send('Unauthorized')
        return;
    } 
    next()
}

module.exports = Routes;