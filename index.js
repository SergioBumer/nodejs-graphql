'use strict'

require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools')

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')

const app = express()
const port = process.env.PORT || 3000

const usersResolvers = require('./lib/resolvers/user/resolvers');
const courseResolvers = require('./lib/resolvers/course/resolvers');

// Definiendo el Schema
const user = readFileSync(join(__dirname, 'lib/schemas', 'user.graphql'), 'utf-8')
const course = readFileSync(join(__dirname, 'lib/schemas', 'course.graphql'), 'utf-8')

// Definiendo los resolvers
const resolvers = [usersResolvers, courseResolvers];
const typeDefs = [user, course];
const schema = makeExecutableSchema({ typeDefs, resolvers })


app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server is listening in port: ${port}`)
})
