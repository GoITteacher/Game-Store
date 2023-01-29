import { faker } from '@faker-js/faker';
faker.locale = 'en';
faker.seed(0);

import { saveToLS, loadFromLS } from '../../scripts/helpers.js';
import { DynamoAPI } from './dynamodb.js';

const TABLES = {
  game: 'GameStore-games',
};

export class DataBase {
  static #limit = 60;

  static createGame(game) {
    if (!game) game = randomGame();
    console.log('Created', game);
    DynamoAPI.createItem(TABLES.game, game);
  }

  static async getGame(id) {
    const game = await DynamoAPI.getItem(TABLES.game, id);
    return game;
  }

  static async getGames(page = 1) {
    try {
      const games = await DynamoAPI.getData(TABLES.game, page, DataBase.#limit);
      saveToLS('allGames', games);
      return games;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

function randomGame() {
  return {
    name: faker.commerce.productName(),
    author: faker.name.fullName(),
    publisher: faker.company.name(),
    date_release: faker.date.past(),
    price: +faker.commerce.price(1000, 20000),
    sale: faker.datatype.number({ min: 0, max: 80 }),
    homepage: faker.internet.url(),
    images: [
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
    ],
    media: [
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
      `https://source.unsplash.com/1920x1080/?random=${getRandom(
        0,
        9999
      )}&game`,
    ],
    os: 'Windows',
    genres: [faker.music.genre(), faker.music.genre(), faker.music.genre()],
    desc: faker.lorem.paragraphs(6),
  };
}

function randomUser() {
  return {
    login: faker.company.name(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    birthday: faker.date.birthdate(),
    developer: faker.datatype.boolean(),
  };
}

function getRandom(min = 0, max = 100) {
  return Math.round(Math.random() * (max - min) + min);
}
