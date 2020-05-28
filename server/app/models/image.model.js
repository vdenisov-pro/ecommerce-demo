const { AbstractModel } = require('../shared');
const { ImageSchema } = require('../../db/schemas');

class ImageModel extends AbstractModel { }

ImageModel.schema = ImageSchema;

module.exports = ImageModel;
