import AWS from 'aws-sdk';
import { ACCESS_KEY, SECRET_ACCESS_KEY } from '../../scripts/constants.js';
import uniqid from 'uniqid';

let awsConfig = {
  region: 'us-east-2',
  endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
let lastEvaluatedKey;

export class DynamoAPI {
  static async createItem(table, item) {
    const randId = uniqid();

    var params = {
      TableName: table,
      Item: {
        ...item,
        id: randId,
      },
    };

    docClient.put(params, function (err, data) {
      if (err) console.log(err);
    });

    return randId;
  }

  static async updateItem(table, id, item) {
    let updateData = DynamoAPI.generateUpdateElem(item);

    let params = {
      TableName: table,
      Key: {
        id: id,
      },
      UpdateExpression: updateData[0],
      ExpressionAttributeValues: updateData[1],
    };

    docClient.update(params, (err, data) => {
      console.log(err, data);
    });
  }

  static async getItemById(table, id, nameColumn = 'id') {
    let params = {
      TableName: table,
      Key: {
        [nameColumn]: id,
      },
    };
    return DynamoAPI.getDataPromise(params);
  }

  static async getItem(table, id, nameColumn = 'id') {
    const params = {
      TableName: table,
      IndexName: 'LoginIndex',
      KeyConditionExpression: `#${nameColumn} = :${nameColumn}`,
      ExpressionAttributeNames: {
        [`#${nameColumn}`]: nameColumn,
      },
      ExpressionAttributeValues: {
        [`:${nameColumn}`]: id,
      },
    };

    const result = await docClient.query(params).promise();
    return result.Items[0];
  }

  static async getItems(table, id, nameColumn = 'id') {
    var params = {
      TableName: table,
      FilterExpression: `contains(${nameColumn}, :${nameColumn})`,
      ExpressionAttributeValues: {
        [':' + nameColumn]: id,
      },
    };

    let data = await docClient.scan(params).promise();
    return data.Items;
  }

  static async getAllItems() {}

  static async getData(table, page, pageSize) {
    const params = {
      TableName: table,
      Limit: pageSize,
      ExclusiveStartKey: page > 1 ? lastEvaluatedKey : undefined,
    };

    const data = await docClient.scan(params).promise();
    lastEvaluatedKey = data.LastEvaluatedKey;
    return data.Items;
  }

  static async deleteItem(table, id) {
    var params = {
      Key: {
        id: id,
      },
      TableName: table,
    };

    docClient.delete(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      }
    });
  }

  static getDataPromise(params) {
    return new Promise(function (resolve, reject) {
      docClient.get(params, (err, data) => {
        if (err) reject(err);

        if (data) {
          let res = data.Item;
          resolve(res);
        }
      });
    });
  }

  static generateUpdateElem(item) {
    let result = 'set ';
    let values = {};

    for (const key of Object.keys(item)) {
      result += ` ${key} = :${key} ,`;
      values[`:${key}`] = item[key];
    }

    result = result.slice(0, result.length - 1);

    return [result, values];
  }
}