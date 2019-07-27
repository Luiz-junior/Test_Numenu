const passport = require("passport");  
const { Strategy, ExtractJwt } = require('passport-jwt');

const users = require("./users");  
const config = require("./config");  

const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
};

module.exports = () => {
    const strategy = new Strategy(params, (payload, done) => {
        let user = users[payload.id] || null;
        if(user) 
            return done(null, { id: user.id });
        else 
            return done(new Error("User not found"), null);
    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};