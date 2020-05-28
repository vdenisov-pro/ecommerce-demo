const { createRouter } = require('node-susanin');
const { checkToken } = require('../../app/shared/access.middleware');

const router = createRouter({
  pathsRelateTo: __dirname,
  routesPaths: [
    '../../app/components/**/*.router.js',
    '../../app/components/**/router.js',
  ],
  middlewaresSequence: ({
    PARAMS_VALIDATION,
    QUERY_VALIDATION,
    BODY_VALIDATION,
    ROUTER_MIDDLEWARES,
  }) => [
    checkToken,
    PARAMS_VALIDATION,
    QUERY_VALIDATION,
    BODY_VALIDATION,
    ROUTER_MIDDLEWARES,
  ],
  onReply: (res, results) => {
    res.status(200).json({ results });
  },
});

module.exports = {
  router,
};
