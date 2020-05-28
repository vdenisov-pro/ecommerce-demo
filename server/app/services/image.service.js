const config = require('config');
const multer = require('multer');
const dateFormat = require('dateformat');

const awsClient = require('../../lib/aws');

// It's local midified package "multer-sharp-s3"
const multerSharpS3 = require('../../lib/multer-sharp-s3');

const { serviceS3 } = config.get('aws');

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerSharpUploader = multerSharpS3({
  s3: awsClient,
  Bucket: serviceS3.bucket,
  ACL: serviceS3.acl,

  Key: (req, file, cb) => {
    const date = dateFormat(new Date(), 'dd-mm-yyyy_HH-MM-ss');
    cb(null, `default/${date}_${file.originalname}`);
  },

  multiple: true,

  resize: [
    { suffix: 'original' },
    { suffix: 'xsmall', width: 100, height: 100 },
    { suffix: 'small', width: 200, height: 200 },
    { suffix: 'medium', width: 500, height: 500 },
    { suffix: 'large', width: 800, height: 800 },
  ],
});

const upload = multer({
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage: multerSharpUploader,
});

module.exports = { awsUploader: upload };
