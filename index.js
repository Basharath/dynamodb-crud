// import AWS from 'aws-sdk';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';

AWS.config.update({ region: 'ap-south-1' });

const DynamoDB = new AWS.DynamoDB();

const documentClient = new AWS.DynamoDB.DocumentClient();

// Creating the table with the key
const createTable = () => {
  const params = {
    TableName: 'Posts',
    KeySchema: [{ AttributeName: 'postId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'postId', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  DynamoDB.createTable(params, function (err, data) {
    if (err) {
      console.error('Unable to create table', err);
    } else {
      console.log('Created table', data);
    }
  });
};

// createTable();

// Function to insert the post into posts table/document
const insertPost = async (postId, title, content) => {
  const params = {
    TableName: 'Posts',
    Item: {
      postId,
      title,
      content,
    },
  };
  try {
    const data = await documentClient.put(params).promise();
    console.log('Post inserted', data);
  } catch (err) {
    console.log(err);
  }
};

// insertPost(
//   nanoid(),
//   'Learn to use DyanamoDB',
//   'Follow this to learn about DyanamoDB'
// );
// insertPost(
//   nanoid(),
//   'How to do CRUD operations in Dynamo?',
//   'It is not that hard to do CRUD operations in DynamoDB.'
// );
// insertPost(
//   nanoid(),
//   'Sample title that can be deleted',
//   'Sample description for the sample post'
// );

// Function to get all the posts
const getAllPosts = async (table) => {
  const params = {
    TableName: table,
  };
  try {
    const data = await documentClient.scan(params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// getAllPosts('Posts');
// {
//   Items: [
//     {
//       content: 'It is not that hard to do CRUD operations in DynamoDB.',
//       postId: 'MMMBIbA9SjFHR_HBdU-0U',
//       title: 'How to do CRUD operations in Dynamo?'
//     },
//     {
//       content: 'Sample description for the sample post',
//       postId: 'FPbCFAvNoKWinPadsNBoW',
//       title: 'Sample title that can be deleted'
//     },
//     {
//       content: 'Follow this to learn about DyanamoDB',
//       postId: 'j6uv_RKuZg5XZll1AkAWx',
//       title: 'Learn to use DyanamoDB'
//     }
//   ],
//   Count: 3,
//   ScannedCount: 3
// }

// Function to get single post from the table/document
const getSinglePost = async (table, keyObj) => {
  const params = {
    TableName: table,
    Key: keyObj,
  };
  try {
    const data = await documentClient.get(params).promise();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
// getSinglePost('Posts', { postId: 'FPbCFAvNoKWinPadsNBoW' });

// Function to update the post based on postId
const updatePost = async (postId, title, content) => {
  const params = {
    TableName: 'Posts',
    Item: {
      postId,
      title,
      content,
    },
    // ReturnConsumedCapacity: 'TOTAL',
  };
  try {
    const data = await documentClient.put(params).promise();
    console.log('Post updated', data);
  } catch (err) {
    console.log(err);
  }
};
// updatePost(
//   'UduchKnZN3boFSyPrASDz',
//   'Update sample post title',
//   'Updated content'
// );

// {
//   Item: {
//     content: 'Updated content',
//     postId: 'FPbCFAvNoKWinPadsNBoW',
//     title: 'Update sample post title'
//   }
// }

// Function to delete the post from posts table/document by postId
const deletePost = async (postId) => {
  const params = {
    TableName: 'Posts',
    Key: {
      postId,
    },
    // ReturnConsumedCapacity: 'TOTAL',
  };
  try {
    const data = await documentClient.delete(params).promise();
    console.log('Post deleted', data);
  } catch (err) {
    console.log(err);
  }
};
// deletePost('UduchKnZN3boFSyPrASDz');
