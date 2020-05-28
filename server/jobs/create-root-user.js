const config = require('config');

const { AuthService } = require('../app/services');


const { mail: rootMail, pass: rootPass } = config.get('root');


module.exports = async () => AuthService.checkUserExistence('admin', rootMail, rootPass);
