const { AuthSchema } = require('../../db/schemas');
const { AbstractModel } = require('../shared');

class AuthModel extends AbstractModel {
  static async findOrCreate(authData) {
    const [object, isNew] = await AuthSchema.findOrCreate({
      where: {
        firebaseUID: { $eq: authData.firebaseUID },
        databaseUID: { $eq: authData.databaseUID },
      },
      defaults: authData,
    });

    return { object, isNew };
  }

  static async findOneByFirebaseUID(firebaseUID) {
    const dbData = await AuthSchema.findOne({
      where: { firebaseUID },
    });

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: dbData };
  }

  static async findOneByDatabaseUID(databaseUID) {
    const dbData = await AuthSchema.findOne({
      where: {
        databaseUID: { $eq: databaseUID },
      },
    });

    return (dbData === null)
      ? { isFind: false, object: null }
      : { isFind: true, object: dbData };
  }
}

AuthModel.schema = AuthSchema;

module.exports = AuthModel;
