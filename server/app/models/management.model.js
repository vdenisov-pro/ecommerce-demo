const { ManagementSchema } = require('../../db/schemas');
const { AbstractModel } = require('../shared');

class ManagementModel extends AbstractModel { }

ManagementModel.schema = ManagementSchema;

module.exports = ManagementModel;
