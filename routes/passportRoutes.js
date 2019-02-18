module.exports = function (app, passport) {

  // Load index page
  app.get("/", function (req, res) {
    res.redirect("index");
  });
  app.get("/index", function (req, res) {
    // console.log("req.user***"+req.user);
    res.render('index', {
      condition: {
        "isNotLogin": typeof req.user === "undefined"
      },
      user: req.user // get the user out of session and pass to template
    });
  });

  //=========login===================
  // show the login form
  app.get("/login", function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render("login", { message: req.flash('loginMessage') });
  });
  // process the login form
  app.post("/api/login", passport.authenticate("local-login", {
    successRedirect: "/", // redirect to main(index) page
    failureRedirect: "/login", // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
    function (req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  //=========signup===================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
  });
  // process the signup form
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the main section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  //=========createpost section======createpost page routes=========
  app.get('/createpost', function (req, res) {//delete "isLoggedIn,"
    // console.log("req.user:++++++= ", req.user);
    res.render("createpost", {
      condition: {
        "isNotLogin": typeof req.user === "undefined"
      },
      user: req.user // get the user out of session and pass to template
    });
  });
  //==========createpostType section====createpostType page routes==========
  app.get("/createpostType", function (req, res) {
    res.render("createpostType", {
      condition: {
        "isNotLogin": typeof req.user === "undefined"
      },
      user: req.user // get the user out of session and pass to template
    });
  });
  //==========createpostType section====createpostType page routes==========
  app.get("/createpostInfo", function (req, res) {
    res.render("createpostInfo", {
      condition: {
        "isNotLogin": typeof req.user === "undefined"
      },
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get("/postItem", function (req, res) {
    res.render("postItem", {
      condition: {
        "isNotLogin": typeof req.user === "undefined"
      },
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get("/directionMap", function (req, res) {
    res.render("directionMap");
  });
  //process the local form
  // app.post("/api/createpost",function(req,res){
  //   // if(err) throw err;
  //   console.log("***data***",res);
  // });
  // ====LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  app.get("/itemsMap", function (req, res) {
    res.render("itemsMap.html");
  });
  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};
// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
