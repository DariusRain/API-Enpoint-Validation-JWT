const jwt = require('jsonwebtoken');

//Create middleware here for authentication of token
//Use this middleware for routes that require tokens.

module.exports =  function (req, res, next) {
    //Check the clients auth-header property from the request
    const token = req.header('auth-token');
    //If that token dosent exist at all then deny access
    if(!token) return res.status(401).send('Access Denied!')

    //Function is allready asycnhronous in the route handler
    //So try verifing the token scince there is one.
    try {
        //This variable holds the value from the verifacation
        //If any falsey vlalue is returned then the catch will bew executed
        const verified = jwt.verify(token, process.env.JWT);
        req.user = verified;
        next()
    
    }catch(err) {
        res.status(400).send('Invalid Token!!!')
    }

}

//Export for routehandler's use
