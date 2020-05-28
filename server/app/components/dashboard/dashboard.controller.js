const Model = require('./dashboard.model');
const { MANAGER } = require('../../shared/user-roles');

const getManagerRating = async ({
  query,
  reply,
  req: { user },
}) => {
  const queryParams = user.role === MANAGER
    ? {
      ...query,
      managerId: user.id,
    }
    : query;
  const managerRating = await Model.getManagerRating(queryParams);
  reply(managerRating);
};

module.exports = {
  getManagerRating,
};
