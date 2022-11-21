const MongoClient = require('mongodb').MongoClient;
const Book = require("../models/BookModel");
const { connectDB, dropDB, dropCollections } = require("./setuptestdb");

// MONGOOSE MEMORY SERVER
beforeAll(async () => {
    await connectDB();
  });
   
  afterAll(async () => {
    await dropDB();
  });
   
  afterEach(async () => {
    await dropCollections();
  });


describe("BookModel", () => {
it("should create a book successfully", async () => {
    let book = {
    title: "this is a test",
    author: "author",
    synopsis: "this is a synopsis",
    genre: "Roman",
    country: "Ethiopia",
    ageRange: "18-26 ans",
    image: "image url",
    dateAdded: {
        stringFormat: "stringFormat",
        parsedFormat: 3456789
    }
    };
    const newBook = await Book(book);
    await newBook.save();
    expect(newBook._id).toBeDefined();
    expect(newBook.title).toBe(book.title);
    expect(newBook.dateAdded.parsedFormat).toBe(book.dateAdded.parsedFormat);
});
});