import axios2 from 'axios';
import { faker } from '@faker-js/faker';

const axios = axios2.create({
  baseURL: 'http://localhost:3333',
});

faker.locale = 'en';
faker.seed(0);

export class GameStoreAPI {
  static getGames() {
    return axios.get('/games').then(res => res.data);
  }
  static getGame(id) {
    return axios.get(`/games/${id}`).then(res => res.data);
  }

  static createGame(game) {
    return axios.post('/games', game || randomGame()).then(res => res.data);
  }

  static deleteGame(id) {
    return axios.delete(`/games/${id}`);
  }

  static updateGame(id, game) {
    return axios.patch(`/games/${id}`, game || randomGame());
  }

  static getUsers() {
    return axios.get('/users').then(res => res.data);
  }
  static getUser(id) {
    return axios.get(`/users/${id}`).then(res => res.data);
  }
  static createUser(user) {
    return axios.post(`/users`, user || randomUser()).then(res => res.data);
  }
  static updateUser(id, user) {
    return axios
      .patch(`/users/${id}`, user || randomUser())
      .then(res => res.data);
  }
  static deleteUser(id) {
    return axios.delete(`/users/${id}`).then(res => res.data);
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
      faker.image.imageUrl(1920, 1080, 'game', true),
      faker.image.imageUrl(1920, 1080, 'game', true),
      faker.image.imageUrl(1920, 1080, 'game', true),
      faker.image.imageUrl(1920, 1080, 'game', true),
    ],
    media: [
      faker.image.imageUrl(1920, 1080, 'game', true),
      faker.image.imageUrl(1920, 1080, 'game', true),
      faker.image.imageUrl(1920, 1080, 'game', true),
      faker.image.imageUrl(1920, 1080, 'game', true),
    ],
    os: 'Windows',
    genres: [faker.music.genre(), faker.music.genre(), faker.music.genre()],
    desc: faker.lorem.paragraphs(3),
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
