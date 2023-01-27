import axiosV2 from 'axios';
const axios = axiosV2.create({
  baseURL: 'http://localhost:3333/',
});
export class DataBase {
  #limit = 20;

  static getGame() {}

  static async getGames(page = 1) {
    const options = {
      params: {
        _limit: 20,
        _page: page,
      },
    };
    try {
      const response = await axios.get('/games', options);
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
