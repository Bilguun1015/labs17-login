const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load db 
const db = require('./databse/db-config')

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username', session: true }, (username, password, done) => {
      // Match user
      db('user')
        .where({
        username: username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That username is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.user_id);
  });

  passport.deserializeUser(function(id, done) {
    db('user')
            .where({ user_id })
            .first()
            .then(user => {
                console.log('User inside deserializeUser:', user);
                done(null, user);
            })
            .catch(error => {
                done(error, false);
            });
  });
};