import axiosV2 from 'axios';
import { DB_URL } from '../../scripts/constants.js';
import { saveToLS, loadFromLS } from '../../scripts/helpers.js';

const axios = axiosV2.create({
  baseURL: DB_URL,
});

export class DataBase {
  static #limit = 60;

  static getGame() {}

  static async getGames(page = 1) {
    const options = {
      params: {
        _limit: DataBase.#limit,
        _page: page,
      },
    };
    try {
      const response = await axios.get('/games', options);
      saveToLS('allGames', response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
