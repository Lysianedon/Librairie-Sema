const MongodHelper = require('mongodb-prebuilt').MongodHelper;
const MongoClient = require('mongodb').MongoClient;
const Book = require("./models/BookModel");

// describe('insert', () => {
//   let connection;
//   let db;
//   beforeAll(async () => {
//     connection = await MongoClient.connect(global.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db();
//   });
  
//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');
  
//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);
  
//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);

//     await users.deleteOne(mockUser);

//   });

//   afterAll(async () => {
//     await connection.close();
//   });
// });

describe('insert', () => {
let connection;
let db;
beforeAll(async () => {
connection = await MongoClient.connect("mongodb://127.0.0.1:27017", {
useNewUrlParser: true,
useUnifiedTopology: true,
});
db = await connection.db();
});

it('should insert a doc into collection', async () => {
const users = db.collection('users');

const mockUser = {_id: 'some-user-id', name: 'John'};
await users.insertOne(mockUser);

const insertedUser = await users.findOne({_id: 'some-user-id'});
expect(insertedUser).toEqual(mockUser);

await users.deleteOne(mockUser);

});

afterAll(async () => {
await connection.close();
});
});



