const express = require('express');
const dbRouter = require('./db-router')
const server = express();

server.use(express.json());
server.use('/api/posts', dbRouter)


server.get('/', (req, res) => {
  console.log('hello world')
})


module.exports = server