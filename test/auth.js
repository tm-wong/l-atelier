'use strict';

const fp = require('fastify-plugin');
const passportJwt = require('passport-jwt');

const { Strategy, ExtractJwt } = passportJwt;

// URL='https://dev-y1z3acypuoplop6h.us.auth0.com/oauth/token'
// CLIENT_ID='Eb87qpJ4g8ZmHBlUhNlCLq3CoW0dzTT9'
// CLIENT_SECRET='A8G8jloi6s92z6l7akqQq8ykonn3HfN3NzDqp_XusyFIzHDpw4gC35CvaZlgP6yk'
// AUDIENCE='https://dev-y1z3acypuoplop6h.us.auth0.com/api/v2/'
// GRANT_TYPE='client_credentials'
// const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1Ybzg4SFJXUEVWYzJCV0pUdDBFaSJ9.eyJpc3MiOiJodHRwczovL2Rldi15MXozYWN5cHVvcGxvcDZoLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteTF6M2FjeXB1b3Bsb3A2aC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4NzA5ODQyMywiZXhwIjoxNjg3MTg0ODIzLCJhenAiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.QVi3FuiSnIy01ay2ODnl7zKF6ngff1GvcZ8qRdWJ7ISotQ98RWCC253Q5IcucjFzIpnER6tiBT6ijj7nJhvPEmYUKXEuerZiZDzCOW0JFiHbTMhAWqACM_XdE0-q631P7ai63gP0t9M1Xlp-JEy8Ozlc4e8tnPwXx0y85W0b2H2oFfVa6jesBWbYNR9AQWBzxAOmKXHYLem93DsKLFSMZeP4ybx0Y6iWy59I3DL8AaQWgbgcdjotZTTbbaafbMKIsrOnIOn5sbocSJTed3qtgHap-rP4HhiTWQWjiqqZky65cV1PecUmz3NkGpLySloCaQeEkmcIVciipa3t7U4c3g'

/*

GET /calendar/v1/events
    Host: api.example.com
    Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1Ybzg4SFJXUEVWYzJCV0pUdDBFaSJ9.eyJpc3MiOiJodHRwczovL2Rldi15MXozYWN5cHVvcGxvcDZoLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYteTF6M2FjeXB1b3Bsb3A2aC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY4NzA5ODQyMywiZXhwIjoxNjg3MTg0ODIzLCJhenAiOiJDWlU3bHpUQVVtZzVNR2pyOFF5UFFKYkhCdVhzVFV5bSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.QVi3FuiSnIy01ay2ODnl7zKF6ngff1GvcZ8qRdWJ7ISotQ98RWCC253Q5IcucjFzIpnER6tiBT6ijj7nJhvPEmYUKXEuerZiZDzCOW0JFiHbTMhAWqACM_XdE0-q631P7ai63gP0t9M1Xlp-JEy8Ozlc4e8tnPwXx0y85W0b2H2oFfVa6jesBWbYNR9AQWBzxAOmKXHYLem93DsKLFSMZeP4ybx0Y6iWy59I3DL8AaQWgbgcdjotZTTbbaafbMKIsrOnIOn5sbocSJTed3qtgHap-rP4HhiTWQWjiqqZky65cV1PecUmz3NkGpLySloCaQeEkmcIVciipa3t7U4c3g
*/
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    secretOrKey: 'A8G8jloi6s92z6l7akqQq8ykonn3HfN3NzDqp_XusyFIzHDpw4gC35CvaZlgP6yk',
    issuer: 'https://dev-y1z3acypuoplop6h.us.auth0.com/'
    audience: 'https://dev-y1z3acypuoplop6h.us.auth0.com/api/v2/'
};


const check = () => {
    return new Strategy(options, function(jwt_payload, done) {
        console.log('jwt_payload', jwt_payload);
        return done();

        /*
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
        */
    });
};

check();
