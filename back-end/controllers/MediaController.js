const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const admin = process.env.API_USN;
const adminPassword = process.env.API_PASS;
const databaseURL = process.env.APP_DB_URL
  .replace('<password>', adminPassword)
  .replace('<admin>', admin)
  .replace('<username>', admin);

const conn = mongoose.createConnection(databaseURL);
const { ObjectId } = require('mongoose').Types;

/*
* MediaController
* Handles all media fetches for the application
* Route: /rgapi/media
*/
class MediaController {
  // Route: /:imageId
  // Gets a single image
  static async GetImage(req, res) {
    const { imageId } = req.params;

    if (!ObjectId.isValid(imageId)) { // Validation
      return res.status(400).json({ message: 'Invalid id.' });
    }

    try {
      const gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images',
      });

      const gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('images');

      const file = await gfs.files.findOne({
        _id: ObjectId(imageId),
      });

      if (!file) {
        return res.status(400).json({ message: 'Image not found.' });
      }
      const { _id } = file; // Very specific way. Will crash if you change this check
      const readStream = gfsBucket.openDownloadStream(_id);
      readStream.pipe(res);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    return null;
  }
}

module.exports = MediaController;
