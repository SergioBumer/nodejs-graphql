'use strict'

const {connectDB} = require('../../db')
const { ObjectID } = require("mongodb");

module.exports = {
  getUsers: async () => {
    let db;
    let users = [];
    try {
      db = await connectDB();
      users = await db.collection("users2").find().toArray();
    } catch (error) {
      console.error(error);
    }
    return users;
  },
  getUser: async (root, { id }) => {
    let db;
    let user;
    try {
      db = await connectDB();
      user = await db.collection("users2").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
    }
    return user;
  },
};
