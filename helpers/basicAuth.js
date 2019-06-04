const config = require("./../config/config");

module.exports = basicAuth;

async function basicAuth(req, res, next) {
    // make authenticate path public
    if (req.path === '/api') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (config.credentials.username === username && config.credentials.password === password) {
        req.user = {};
        next();
    } else {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    };
    
}