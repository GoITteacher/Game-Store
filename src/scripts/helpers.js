import crypto from 'crypto';
import { HOST } from './constants.js';

export function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return data || [];
  }
}

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
}

export const sha256 = data => {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
};

export function isAuthorized() {
  const isAuthorized = loadFromLS('isAuthorized');
  if (isAuthorized === undefined) {
    saveToLS('isAuthorized', false);
  }
  return isAuthorized || false;
}

export function redirect(url = '', params = '') {
  const origin = window.location.origin;
  const newUrl = `${origin}${HOST}${url}${params}`;
  window.location.replace(newUrl);
}
