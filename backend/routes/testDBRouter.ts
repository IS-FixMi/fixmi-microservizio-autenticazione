/*
 *   File: testDBRouter.ts 
 *
 *   Purpose: this file contains all the routes after
 *            /api/testDB
 *            It is used to test the connection to the database
 *
 */ 

import express from 'express' 

const {MongoClient} = require("mongodb");
import { db } from '../server';

// '/api/auth/testDB'
const testDBRouter = express.Router();

// GET route
testDBRouter.get('/', async (req, res) => {

  const allUsers = await db.collection("users").find({}).toArray();

  res.json(allUsers);
});

export default testDBRouter;
