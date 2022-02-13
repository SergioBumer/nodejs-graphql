"use strict";

const { connectDB } = require("../../db");
const { ObjectID } = require("mongodb");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      description: "",
      topic: "",
    };

    const newCourse = Object.assign(defaults, input);
    let db;
    let course;

    try {
      db = await connectDB();
      course = await db.collection("courses").insertOne(newCourse);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.error(error);
    }

    return newCourse;
  },
  editCourse: async (root, { id, input }) => {
    let db;
    let course;

    try {
      db = await connectDB();
      await db
        .collection("courses")
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error(error);
    }

    return course;
  },
  deleteCourse: async (root, { id }) => {
    let db;
    let course;
    try {
      db = await connectDB();
      course = await db.collection("courses").findOne({ _id: ObjectID(id) });
      if (course) {
        await db.collection("courses").deleteOne({ _id: ObjectID(id) });
      }
    } catch (error) {
      console.error(error);
    }

    return course;
  },
  addPeople: async (root, { courseID, personID }) => {
    let db;
    let course;
    let person;
    try {
      db = await connectDB();
      course = await db
        .collection("courses")
        .findOne({ _id: ObjectID(courseID) });
      person = await db
        .collection("users2")
        .findOne({ _id: ObjectID(personID) });

      if (!course || !person) {
        throw new Error("La persona o el curso no existe");
      }

      await db.collection("courses").updateOne(
        {
          _id: ObjectID(courseID),
        },
        { $addToSet: { people: ObjectID(personID) } }
      );
    } catch (error) {
      console.error(error);
    }

    return course;
  },
};
