// config/passport.js

// load all the things we need
var LocalStrategy = require("passport-local").Strategy;

var bcrypt = require("bcrypt-nodejs");
//the db connected????
module.exports = function (passport, db) {
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        console.log("user: ",user.id);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        console.log("id: ",id);
        db.User.find({ where: { id: id } }).then(function (user) {
            // console.log("user: ",user);
            done(null, user);
        }).catch(function(err){console.log("err-------",err);});
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use(
        "local-signup",
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, username, password, done) {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                db.User.findAll({ where: { username: username } }).then(function (rows) {
                    // if (err)
                    //     return done(err);
                    console.log("******", rows.length);
                    if (rows.length) {
                        console.log("___________=====");
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // if there is no user with that username
                        // create the user
                        var newUserMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                        };

                        // var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                        db.User.create({ username: newUserMysql.username, password: newUserMysql.password }).then(function (user) {
                            newUserMysql.id = user.id;
                            console.log("newUserMysql**", newUserMysql);
                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, username, password, done) { // callback with email and password from our form
                console.log("*****username:", username);
                db.User.findOne({ where: { username: username } }).then(function (user) {
                    // if (err)
                    //     return done(err);
                    // console.log("findOne: ",user.id);
                    //=======pass user.id to postIem page===??================
                    // var userId = JSON.stringify(user.id);
                    // localStorage.setItem("locationVal", user.id);
                    //========================
                    if (user==null) {
                        console.log("No user found.");
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, user.password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, user);
                });
            })
    );
};
