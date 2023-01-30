import mysql from 'mysql2';
import { DB_USERNAME, DB_PASSWORD, DB_URL } from '../../scripts/constants';

const connection = mysql.createConnection({
  host: DB_URL,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'game-store',
});

export class DatabaseAPI {
  static createTable(tableName) {
    const query = `
    CREATE TABLE ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        column1 VARCHAR(255),
        column2 VARCHAR(255),
        column3 DATE
    );`;

    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log(results);
    });
  }
}
