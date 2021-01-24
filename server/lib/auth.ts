const jsonwebtoken = require('jsonwebtoken')
const config = require('../config.json');

// Auth schema and resolvers

function loadUser(authHeader) {
    if (!authHeader)
        return null;

    const token = authHeader.split(' ')[1];

    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, config.jwtSecret, (err, user) => {
            if (err) reject(err);
            if (user) resolve(user);
        });
    });
}
    
export async function authenticateUser(request, response, next) {
    const authHeader = request.get("authorization");
    request.user = await loadUser(authHeader);
    next();
};