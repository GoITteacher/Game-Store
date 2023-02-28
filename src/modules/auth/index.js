import { loadFromLS, saveToLS, sha256 } from '../../scripts/helpers';
import { DynamoAPI } from '../database/dynamodb';

const TABLE_NAME = 'GameStore-users';

export class Auth {
  static createUser(user) {
    user.password = Auth.#convert(user.password);

    if (user.login && user.email && user.password) {
      DynamoAPI.createItem(TABLE_NAME, user);
    } else {
      console.log('Error user', user);
    }
  }

  static async getUser(login) {
    const users = await Auth.getUsers();
    const user = users.find(el => el.login === login);
    saveToLS('user', user);
    return user;
  }

  static async getUsers() {
    try {
      const users = await DynamoAPI.getAllItems(TABLE_NAME);
      saveToLS('users', users);
      return users;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static async authorized(login, password) {
    if (Auth.isCorrectPassword(login, password)) {
      saveToLS('isAuthorized', true);
      return true;
    } else {
      return false;
    }
  }

  static async isFreeLogin(login) {
    const users = await Auth.getUsers();
    const isFree = users.some(el => el.login === login);
    return !isFree;
  }

  static async isCorrectPassword(login, password) {
    try {
      const user = await Auth.getUser(login);
      if (!user) throw new Error('Not User');

      if (Auth.#convert(password) === user.password) {
        saveToLS('user', user);
      }

      return Auth.#convert(password) === user.password;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  static #convert(text) {
    return sha256(text);
  }
}
