const config = require('config');
const aws = require('aws-sdk');

const { mainInfo } = config.get('aws');

aws.config.update({
  region: mainInfo.region,
  accessKeyId: mainInfo.accessKeyId,
  secretAccessKey: mainInfo.secretAccessKey,
});

const awsClient = new aws.S3();

module.exports = awsClient;
