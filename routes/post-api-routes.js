var db = require("../models");

module.exports = function (app) {
  // Get all posts
  app.get("/api/allPosts", function (req, res) {
    db.Post.findAll({
      order: [
        ['id', 'DESC'],
        ['title', 'ASC'],
      ]
    }).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });
  app.get("/api/getPost/:id", function (req, res) {
    var id = req.params.id;
    db.Post.findById(id).then(function (dbpost) {
      res.json(dbpost);
    });
  });
  // Create a new post
  app.post("/api/createpostInfo", function (req, res) {
    console.log("req.body:?? ", req.body);
    db.Post.create(req.body).then(function (err, dbPost) {
      if (err) throw err;
      // res.json(dbPost);
      res.send("Success Submit");
    });
  });
  // Search By like %title %
  app.get("/api/createpostInfo/title/:title", function (req, res) {
    var Sequelize = require('sequelize');
    var Op = Sequelize.Op;
    db.Post.findAll({
      where: {
        title: {
          [Op.like]: [`%${req.params.title}%`]
        }
      },
      order: [
        ['id', 'DESC'],
        ['title', 'ASC'],
      ]
    }).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });

  // Search By username
  app.get("/api/createpostInfo/username/:username", function (req, res) {
    db.Post.findAll({
      where: {
        userName: req.params.username
      },
      order: [
        ['id', 'DESC'],
        ['title', 'ASC'],
      ]
    }).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });
  // Search By zipcode
  app.get("/api/createpostInfo/zipcode/:zipcode", function (req, res) {
    db.Post.findAll({
      where: {
        postCode: req.params.zipcode
      },
      order: [
        ['id', 'DESC'],
        ['title', 'ASC'],
      ]
    }).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });
  // Delete a post by id
  app.delete("/api/createpostInfo/:id", function (req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function (dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/createMap", function (err, res) {
    if (err) throw err;
    alert("/api/createMap: " + JSON.stringify(res.body));
  });
};
