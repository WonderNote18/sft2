class UserModel {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static async fetchUser(userId) {
    // Fetch user data from server, return instance of UserModel
  }
}

export default UserModel;