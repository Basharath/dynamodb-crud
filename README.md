# DynamoDB CRUD operations

For detailed explanation follow up [DynamoDB NodeJS crud operations guide](https://devapt.com/dynamodb-nodejs-crud)

## Create a table

Creating a table named `Posts` with primary key `postId`

`createTable('Posts', 'postId');`

---

## Insert data into `Posts` table (C)

```js
insertPost(
  nanoid(),
  'Learn to use DyanamoDB',
  'Follow this to learn about DyanamoDB'
);
insertPost(
  nanoid(),
  'How to do CRUD operations in Dynamo?',
  'It is not that hard to do CRUD operations in DynamoDB.'
);
insertPost(
  nanoid(),
  'Sample title that can be deleted',
  'Sample description for the sample post'
);
```

---

## Fetch posts from the `Posts` table (R)

### Get all posts using table name

```js
getAllPosts('Posts');
```

Result:

```json
{
  "Items": [
    {
      "content": "Follow this to learn about DyanamoDB",
      "postId": "DIylyPPcxYYc0vNsxjNUP",
      "title": "Learn to use DyanamoDB"
    },
    {
      "content": "Sample description for the sample post",
      "postId": "UduchKnZN3boFSyPrASDz",
      "title": "Sample title that can be deleted"
    },
    {
      "content": "It is not that hard to do CRUD operations in DynamoDB.",
      "postId": "IygP_2NLyoRxysBxals7O",
      "title": "How to do CRUD operations in Dynamo?"
    }
  ],
  "Count": 3,
  "ScannedCount": 3
}
```

### Get single post by postId

```js
getSinglePost('Posts', { postId: 'UduchKnZN3boFSyPrASDz' });
```

Result:

```json
{
  "Item": {
    "content": "Sample description for the sample post",
    "postId": "UduchKnZN3boFSyPrASDz",
    "title": "Sample title that can be deleted"
  }
}
```

---

## Update a post by `postId` (U)

```js
updatePost(
  'UduchKnZN3boFSyPrASDz',
  'Update sample post title',
  'Updated content'
);
```

---

## Delete a post by `postId` (D)

```js
deletePost('UduchKnZN3boFSyPrASDz');
```

```js
{
  Items: [
    {
      content: 'Follow this to learn about DyanamoDB',
      postId: 'DIylyPPcxYYc0vNsxjNUP',
      title: 'Learn to use DyanamoDB'
    },
    {
      content: 'It is not that hard to do CRUD operations in DynamoDB.',
      postId: 'IygP_2NLyoRxysBxals7O',
      title: 'How to do CRUD operations in Dynamo?'
    }
  ],
  Count: 2,
  ScannedCount: 2
}
```
