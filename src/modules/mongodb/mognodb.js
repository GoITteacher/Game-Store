/* import mongoose from 'mongoose/browser';

const driver = global.MONGOOSE_DRIVER_PATH || './drivers/node-mongodb-native';
const Connection = require(driver + '/connection');


import { faker } from '@faker-js/faker';
import { connect } from 'mongoose';
import {
  MONGO_LOGIN,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
} from '../../scripts/constants';

faker.locale = 'en';
faker.seed(0);

Connection(
  `mongodb+srv://${MONGO_LOGIN}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.cp32m0m.mongodb.net/?retryWrites=true&w=majority`
);

const Game = mongoose.model('Game', {
  name: String,
  author: String,
  publisher: String,
  date_release: String,
  price: Number,
  sale: Number,
  homepage: String,
  images: Array,
  media: Array,
  os: String,
  genres: Array,
  desc: String,
});

export class MongoDB {
  static saveGame(game) {
    if (!game) game = randomGame();
    const gameElem = new Game(game);
    gameElem
      .save()
      .then(() => {
        console.log('OK');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function randomGame() {
  return {
    name: faker.commerce.productName(),
    author: faker.name.fullName(),
    publisher: faker.company.name(),
    date_release: faker.date.past(),
    price: +faker.commerce.price(10, 100) * 100,
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
    desc: faker.lorem.paragraphs(3),
  };
}
 */
