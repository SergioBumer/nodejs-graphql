'use strict'

const {connectDB} = require('../../db')
const { ObjectID } = require("mongodb");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      description: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      console.error(error)
    }

    return newCourse
  },
  editCourse: async (root, { id, input }) => {

    let db
    let course

    try {
      db = await connectDB()
      await db.collection('courses').updateOne({ _id: ObjectID(id)}, {$set: input})
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error)
    }

    return course
  },
  deleteCourse: async (root, { id }) => {

    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
      if(course) {
        await db.collection('courses').deleteOne({ _id: ObjectID(id)})
      }
    } catch (error) {
      console.error(error)
    }

    return course
  }
}