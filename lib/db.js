"use strict";
const { MongoClient } = require("mongodb");
const { DB_HOST } = process.env;

let connection;

async function connectDB() {
  if (connection) {
    return connection;
  }

  let client;
  try {
    client = await MongoClient.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db("platzi");
  } catch (error) {
    console.error("Could not connect to db", DB_HOST, error);
    process.exit(1);
  }

  return connection;
}

module.exports = {
  connectDB,
};
