'use strict'

const {connectDB} = require('../../db')

const { ObjectID } = require("mongodb");

module.exports = {
  createUser: async (root, { input }) => {
    const defaults = {
      email: '',
      ip_address: '',
      gender: ''
    }

    const newUser = Object.assign(defaults, input)
    let db
    let user

    try {
      db = await connectDB()
      user = await db.collection('users2').insertOne(newUser)
      newUser._id = user.insertedId
    } catch (error) {
      console.error(error)
    }

    return newUser
  },
  editUser: async (root, { id, input }) => {

    let db
    let user

    try {
      db = await connectDB()
      user = await db.collection('users2').updateOne({ _id: ObjectID(id)}, {$set: input})
      user = await db.collection("users2").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error)
    }

    return user
  },
  deleteUser: async (root, { id }) => {

    let db
    let user
    try {
      db = await connectDB()
      user = await db.collection("users2").findOne({ _id: ObjectID(id) });
      if(user) {
        console.log("Eliminando usuario!");
        await db.collection('users2').deleteOne({ _id: ObjectID(id)})
      }
    } catch (error) {
      console.error(error)
    }

    return user;
  }
}