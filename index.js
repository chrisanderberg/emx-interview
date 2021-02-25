const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/', (req, res) => res.send("test"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function showTimes() {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}