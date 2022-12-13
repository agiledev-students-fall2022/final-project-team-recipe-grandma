const multer = require('multer');
// const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');

const admin = process.env.API_USN;
const adminPassword = process.env.API_PASS;
const databaseURL = process.env.APP_DB_URL
  .replace('<password>', adminPassword)
  .replace('<admin>', admin)
  .replace('<username>', admin);

const storage = new GridFsStorage({
  url: databaseURL,
  destination: 'uploads',
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg', 'image/jpg'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-rg-image-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'images',
      filename: `${Date.now()}-rg-image-${file.originalname}`,
    };
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(path.resolve(__dirname, '..'), 'public/assets'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-rg-image-${file.originalname}`);
//   },
// });

module.exports = multer({ storage });
