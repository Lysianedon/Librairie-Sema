const MongoClient = require('mongodb').MongoClient;
const Book = require("./models/BookModel");

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

const mockBook = {_id: 'some-user-id', title: 'Test BookRouter', dateAdded: 168630373, author: 'John Doe', country: 'Nigeria'};
await users.insertOne(mockBook);

const insertedUser = await users.findOne({_id: 'some-user-id'});
expect(insertedUser).toEqual(mockBook);

await users.deleteOne(mockBook);

});

afterAll(async () => {
await connection.close();
});
});



