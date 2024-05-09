/*
 *   File: app.ts 
 *
 *   Purpose: this file contains the main code for the back-end server 
 *
 */ 

// Express
import express from 'express';

// Routes
import greetRouter from './routes/greetRoutes';
import testDBRouter from './routes/testDBRouter';
import loginRouter from "./routes/loginRoutes";
import bodyParser from "body-parser";
import authRouter from "./routes/authRoutes";
import registerRouter from "./routes/registerRoutes";
import pwdChangeRouter from "./routes/passwordRoutes";
import removeRouter from "./routes/removeRoutes";
import logoutRouter from "./routes/logoutRoutes";
import twoFArouter from "./routes/TwoFARoutes";
import cors from "cors";
// Get variables from .env file
require('dotenv').config();

const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3001;

// ------------ MONGODB -------------

// Setup MongoDB
const {MongoClient} = require("mongodb");
let db

const DB_USERNAME = process.env.MICROSERVIZIO_DB_USERNAME || "fixme";
const DB_PASSWORD = process.env.MICROSERVIZIO_DB_PASSWORD || "fixme";
const DB_IP = process.env.MICROSERVIZIO_DB_IP || "10.5.0.10";
const DB_PORT = "27017";
const DB_NAME = "Users";

// Connect to the database
async function startDB() {
  const client = new MongoClient("mongodb://" + DB_USERNAME +
      ":" + DB_PASSWORD + "@"
      + DB_IP + ":" + DB_PORT +
      "/" + DB_NAME +"?&authSource=admin");
  // Let's wait for the connection
  await client.connect();
  // This return the database
  db = client.db();
}

startDB()

export { db };

// ------------ SAME ORIGIN POLICY  -------------
//
// We need to disable Same Origin Policy since the 
// frontend and the backend run on different servers,
// the frontend must send requests to a server that 
// is not itself, breaking the SOP
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
  });


// ------------------ ROUTES ------------------
const options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(options));
app.use(bodyParser.urlencoded());
app.use("/api/auth/greet", greetRouter);
app.use("/api/auth/testDB", testDBRouter);
app.use("/api/auth/login",loginRouter);
app.use("/api/auth/twofa",twoFArouter);
app.use("/api/auth/authenticate",authRouter);
app.use("/api/auth/register",registerRouter);
app.use("/api/auth/changepass",pwdChangeRouter);
app.use("/api/auth/remove",removeRouter);
app.use("/api/auth/logout",logoutRouter);
// Run server
app.listen(port, () => {
  return console.log(`Express is listening at http://127.0.0.1:${port}`);
});
export  {app}
