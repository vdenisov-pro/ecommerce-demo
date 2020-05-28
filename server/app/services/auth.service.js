const bcrypt = require('bcryptjs');

const FirebaseService = require('./firebase.service');
const { UserModel, AuthModel } = require('./../models');

class AuthService {
  static createPasswordHash(receivedPassword) {
    const createdSalt = bcrypt.genSaltSync(10);
    const createdHash = bcrypt.hashSync(receivedPassword, createdSalt);
    return createdHash;
  }

  static comparePasswords(receivedPasswordFromUser, hashedPasswordFromDatabase) {
    return bcrypt.compareSync(
      receivedPasswordFromUser,
      hashedPasswordFromDatabase,
    );
  }

  static async checkUserExistence(userRole, userEmail, userPass) {
    // STEP 1: find/create root user on firebase
    const firebaseUser = await FirebaseService.findUserByEmail(userEmail)
      .catch(() => FirebaseService.createUserByEmailAndPassword(userEmail, userPass));

    // STEP 2: find/create root use in database
    const { object: databaseUser } = await UserModel.findOrCreate({
      role: userRole,
      email: userEmail,
      password: this.createPasswordHash(userPass),
    });

    // STEP 3: find/create auth record in database
    await AuthModel.findOrCreate({ firebaseUID: firebaseUser.uid, databaseUID: databaseUser.id });
  }
}


module.exports = AuthService;
