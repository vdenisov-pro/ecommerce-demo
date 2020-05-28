const { firebaseApp, firebaseAdmin } = require('../../lib/firebase');

class FirebaseService {
  static async createUserByEmailAndPassword(email, password) {
    return firebaseAdmin.auth()
      .createUser({ email, password });
  }

  static async authorizeUserByEmailAndPassword(email, password) {
    return firebaseApp.auth()
      .signInWithEmailAndPassword(email, password);
  }

  static async verifyIdToken(idToken) {
    return firebaseAdmin.auth()
      .verifyIdToken(idToken);
  }

  static async findUserByUid(uid) {
    return firebaseAdmin.auth()
      .getUser(uid);
  }

  static async findUserByEmail(email) {
    return firebaseAdmin.auth()
      .getUserByEmail(email);
  }

  static async getAllUsers() {
    return firebaseAdmin.auth()
      .listUsers();
  }

  static async deleteUserByUid(uid) {
    return firebaseAdmin.auth()
      .deleteUser(uid);
  }
}

module.exports = FirebaseService;
