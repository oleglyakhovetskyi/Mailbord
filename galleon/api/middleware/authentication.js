const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const herb = require('herb');

exports = module.exports = function (urls) {
  return function authenticator(req, res, next) {

    // Use a REGEX like code here
    if ((req.path !== urls.login) || req.path !== urls.logout) {
      // Basic cookie/token based authentication
      let token = req.signedCookies.authentication;
      if ((!token) || (token == '') || (!token.sessionID)) {
        try {
          // token = req.get('Authorization');
          token = jwt.verify(req.get('Authorization') || "", req.envSecret);
        } catch (error) {
          token = null;
          req.getCredentials = function (callback) { callback("NOT AUTHENTICATED1") };
        }
      } // :O No cookie!


      if (!token) {
        req.getCredentials = function (callback) { callback(req.get('Authorization')) }
      } else {
        req.getCredentials = function (callback) {
          if (!token.sessionID) return res.redirect(urls.login);
          //
          /// Do a ton of cool security stuff here
          //
          req.database.models.sessions.findOne({ sessionID: token.sessionID }).exec(function (error, session) {
            if ((!session) || (!session.email)) return callback("Session Not Found");

            if (moment(session.stamp.expires).isBefore(moment())) {
              req.database.models.sessions.destroy({ sessionID: token.sessionID }, function (error) {
                // Should do better logging here
                // An invalid sessionID would either
                //   mean a broken secret key or
                //   possibly an error in the token
                //	 system.
                if (error) console.log(error);
                res.clearCookie('authentication');
                callback("Session expired");
              });
            } else {
              req.database.models.users.findOne({ email: session.email }).exec(function (error, user) {
                if ((!user) || (!user.email)) return callback("Email Not Found");;
                callback(error, { email: user.email, name: user.name });
              });
            }
          });
        }
      }
      ///
    }

    req.signIn = function (req, res, callback) {
      var opened = moment();
      var expires = opened.add(7, 'days');

      herb.config({ verbose: (req.environment.verbose) ? 4 : 1 });

      if (req.environment.verbose) herb.log('Login requested for', req.param('email'));

      req.database.models.users.findOne({ email: req.param('email') }).exec(function (error, user) {
        if (error) herb.error(error);

        if (error) return callback(error);
        if (!user) return callback('User not found.');
        if (!user.id) return callback('Email does not match a record');

        bcrypt.compare(req.param('password'), user.password, function (error, result) {
          if (error) herb.error(error);
          if (error) return callback(error);
          if (result) {
            herb.marker({ color: 'green' }).log('accessGranted to', user.email);
            req.database.models.sessions.destroy({ email: req.param('email') }, function (error) {
              // Log any errors here
              if (error) callback("DATABASE ERROR");
              // Create a new session token
              req.database.models.sessions.create({
                email: user.email,
                access: 'approved',
                ipAddress: req.ip,
                stamp: { opened: opened.toISOString(), expires: expires.toISOString() }
              }, function (error, session) {
                if (error) return callback(error);

                const payload = { sessionID: session.sessionID, opened: opened };
                const token = jwt.sign(payload, req.envSecret);

                res.cookie('authentication', payload, { signed: true, httpOnly: true, secure: (req.protocol === 'https') });
                return callback(error, token);
              });
            })
          } else {
            herb.marker({ color: 'red' }).log('accessDenied to', user.email);
            return callback("INCORRECT PASSWORD");
          }
        });
      })
    }

    req.signOut = function (req, res, callback) {
      // If cookie/token does not exist then call it a success
      const token = req.signedCookies.authentication || jwt.verify(req.headers.token || "", req.envSecret);
      if (!token) callback(null);

      req.database.models.sessions.destroy({ sessionID: token.sessionID }, function (error) {
        // Should do better logging here
        // An invalid sessionID would either
        //   mean a broken secret key or
        //   possibly an error in the token
        //	 system.
        if (error) console.log(error);
        res.clearCookie('authentication');
        return callback(error);
      });
    }

    req.changePassword = function (req, res, callback) {
      req.getCredentials(function (error, credentials) {
        if (error) res.status(403).json({ error: "Not Authenticated" });

        if (req.environment.verbose) herb.log('Password Change requested for', credentials.name + ' <' + credentials.email + '>');
        req.database.models.users.findOne({ email: credentials.email }).exec(function (error, user) {
          if (error) herb.error(error);

          if (error) return callback(error);
          if (!user) return callback('User not found.');
          if (!user.id) return callback('Email does not match a record');

          req.galleon.changePassword(user, req.param('password'), req.param('cpassword'), function (error) {
            if (!error) if (req.environment.verbose) herb.log('Password Changed for', credentials.name + ' <' + credentials.email + '>');
            callback(error);
          });

        })
      });
    }

    next();
  }
}