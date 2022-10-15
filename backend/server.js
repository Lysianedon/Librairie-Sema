//--------- EXPRESS AND MONGOOSE ------------//
const express = require("express");
const app = express();
const port = 8001;
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

//-------------- DOTENV ----------------------//
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//------ BODY PARSER AND COOKIE PARSER ------//
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//----------------- CORS --------------------//
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:8080", "https://lysianedon.github.io"],
    credentials: true,
  })
);

//--------------- MIDDLEWARES ----------------//
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

//---------------- MODELS -----------------//
const Users = require("./models/UserModel");
const Books = require("./models/BookModel");

//------------ CONNECT TO MONGODB -------------//
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"));

//--------------- ROUTERS ------------------//
const loginRouter = require("./routers/loginRouter");
const logoutRouter = require("./routers/logoutRouter");
const signupRouter = require("./routers/signupRouter");
const usersRouter = require("./routers/usersRouter");
const booksRouter = require("./routers/BooksRouter");
const adminRouter = require('./routers/adminRouter');

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);
app.use("/user", usersRouter);
app.use("/books", booksRouter);
app.use("/admin", adminRouter);

//---------------- ROUTES -----------------//

app.get("*", (_req,res) => {
    res.status(404).send("Error 404 - Not Found!")
})

//------------- START SERVER -------------//
app.listen(port, () => {
    console.log(`Server listening at : http://localhost:${port}`);
  });