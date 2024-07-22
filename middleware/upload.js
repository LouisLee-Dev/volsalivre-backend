const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// });

var upload = multer();

module.exports = upload;
