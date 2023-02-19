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

  static async updateItem(tableName, itemId, attributeName, attributeValue) {
    const params = {
      TableName: tableName,
      Key: {
        "id": itemId
      },
      UpdateExpression: `set ${attributeName} = :val`,
      ExpressionAttributeValues: {
        ":val": attributeValue
      }
    };
  
    try {
      const result = await docClient.update(params).promise();
      return result;
    } catch (err) {
      console.log(`Произошла ошибка при обновлении атрибута ${attributeName} элемента с ID ${itemId} в таблице ${tableName}:`, err);
      throw err;
    }
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

  static async getAllItems(table) {
    const params = {
      TableName: table,
    };

    const data = await docClient.scan(params).promise();
    return data.Items;
  }

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
    //UpdateExpression
    //ExpressionAttributeNames
    //ExpressionAttributeValues

    const result = {
      UpdateExpression: null,
      ExpressionAttributeNames: null,
      ExpressionAttributeValues: null,
    }



    return result;
  }
}
