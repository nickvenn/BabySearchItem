
const multer = require('multer');
const path = require('path');
module.exports = function (app) {

  // Set The Storage Engine
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // Init Upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('myImage');
  // var upload = multer({ dest: 'uploads/' })
  // Check File Type
  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
  app.get("/upload", function (req, res) {
    res.render("upload");
  });
  //   app.post('/api/upload', upload.single('myImage'), (req, res, next) => {
  //     // here in the req.file you will have the uploaded avatar file
  //     console.log("another : "+req.file);
  //  })
  app.post('/upload', (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        // res.json({ success: false, message: err });
        res.render("upload", {
          msg: err
        });
      }
      else {
        // res.render('upload', {
        //   condition: {
        //     "isNotUpload": typeof req.file === "undefined"
        //   },
        //   srcPath: req.file.path // get the user out of session and pass to template
        // });
        if (req.file == undefined) {
          console.log("no image file upload");
          // res.send(JSON.stringify(req));
          res.render("upload", {
            msg: 'Error: No File Selected!'
          });
        } else {
          console.log(req.file);
          // res.json(req.file);
          // res.send(`/uploads/${req.file.filename}`);
          res.render("upload", {
            msg: 'File Uploaded!',
            filePath: `/uploads/${req.file.filename}`
          });
        }
      }
    });
  });
}
