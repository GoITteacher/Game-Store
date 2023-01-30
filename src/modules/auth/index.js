import { saveToLS, sha256 } from '../../scripts/helpers';
import { DynamoAPI } from '../database/dynamodb';

const TABLE_NAME = 'GameStore-users';

export class Auth {
  static createUser(user) {
    user.password = Auth.#convert(user.password);

    if (user.login && user.email && user.password) {
      DynamoAPI.createItem(TABLE_NAME, user);
    }
  }

  static async getUser(login) {
    const user = await DynamoAPI.getItem(TABLE_NAME, login, 'login');
    return user;
  }

  static async isFreeLogin(login) {
    const user = await DynamoAPI.getItem(TABLE_NAME, login, 'login');
    return user === undefined;
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
