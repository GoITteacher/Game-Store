import { faker } from '@faker-js/faker';
import uniqid from 'uniqid';
faker.locale = 'en';

import { saveToLS, loadFromLS } from '../../scripts/helpers.js';
import { DynamoAPI } from './dynamodb.js';
import IMAGES from './images.json';
const TABLES = {
  game: 'GameStore-games',
  users: 'GameStore-users',
};

export class DataBase {
  static #limit = 20;
  static page = 1;
  static #online = true;

  static async createGame(game) {
    if (!game) game = randomGame();
    console.log('Created', game);
    return await DynamoAPI.createItem(TABLES.game, game);
  }

  static async getGameById(id) {
    const games = loadFromLS('games') || [];
    let game = games.find(el => el.id === id);
    if (game) return game;

    if (DataBase.#online) {
      const game = await DynamoAPI.getItem(TABLES.game, id);
      return game;
    } else {
      const game = randomGame();
      game.id = uniqid();
      return game;
    }
  }


  static async deleteGame(id){
    let games = loadFromLS('games') || [];
    games = games.filter(game => game.id !== id);
    saveToLS('games', games);

    DynamoAPI.deleteItem(TABLES.game, id);
  }

  static async getGame(...gamesId){
    const promises = gamesId.map(id=>{
      return DataBase.getGameById(id)
    });
    return Promise.all(promises);
  }

  static async getGames(page) {
    if (!DataBase.#online) {
      const games = [];
      for (let i = 0; i < DataBase.#limit; i++) {
        games[i] = randomGame();
        games[i].id = uniqid();
      }
      return games;
    }

    if (page) DataBase.page = page;
    try {
      const games = await DynamoAPI.getData(
        TABLES.game,
        DataBase.page,
        DataBase.#limit
      );
      return games;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  static addGameForUser(gameId){
    const user = loadFromLS('user');
    user.games.push(gameId);
    saveToLS('user', user);
    DynamoAPI.updateItem(TABLES.users, user.id, 'games', user.games);
  }

  static removeGameFromUser(gameId){
    const user = loadFromLS('user');
    user.games = user.games.filter(id => id !== gameId);
    saveToLS('user', user);
    DynamoAPI.updateItem(TABLES.users, user.id, 'games', user.games);
  }
}

function randomGame() {
  return {
    name: faker.commerce.productName(),
    author: faker.name.fullName(),
    publisher: faker.company.name(),
    rating: (Math.random() * 5).toFixed(1),
    downloads: getRandom(1000, 10000),
    date_release: faker.date.past().getTime(),
    price: +faker.commerce.price(1000, 20000),
    sale: faker.datatype.number({ min: 0, max: 80 }),
    homepage: faker.internet.url(),
    specs: {
      minimum: generateSpec(),
      recommend: generateSpec(),
    },
    images: [Images.getImage(),Images.getImage(),Images.getImage()],
    media: Images.getImages(),
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

export function generateSpec() {
  const specs = {
    OS: [
      'Windows XP',
      'Windows 7',
      'Windows 8',
      'Windows 10',
      'Windows 11',
      'MacOS',
      'Linus',
    ],
    Processor: ['Intel or AMD at 2.8 GHz'],
    Memory: ['4GB RAM', '8GB RAM', '16GB RAM'],
    Graphics: ['NVIDIA GeForce 8600/9600GT', 'ATI/AMD Radeon HD2600/3600'],
    DirectX: ['v9', 'v10', 'v11', 'v12', 'v13'],
    Storage: ['10GB', '20GB', '30GB', '40GB', '50GB', '100GB'],
  };

  const result = {};

  for (let i = 0; i < getRandom(3, 7); i++) {
    let key = Object.keys(specs)[getRandom(0, Object.keys(specs).length - 1)];
    let rand = specs[key][getRandom(0, specs[key].length - 1)];
    result[key] = rand;
  }

  return result;
}


class Images{
  static images = IMAGES;
  static counter = 0;

  static getImage(index){
    if(index){
      return Images.images[index];
    }
    index = ++Images.counter % Images.images.length;
    return Images.images[index];
  }

  static getImages(){
    const count = getRandom(3,7);
    const result = [];
    for(let i=0;i<count;i++){
      result.push(Images.getImage(getRandom(0,Images.images.length-1)))
    }
    return result;
  }
}