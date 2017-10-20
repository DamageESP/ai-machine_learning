// Express Server
const express = require('express')
const app = express()

const pug = require('pug')

// Machine Logic
const Machine = require('./machine/core.js')

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Machine Learning server started.')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api/:type', (req, res) => {
  let iterations = 100
  let type = req.params.type
  let m1 = new Machine("local", 0.4, 0, 0, {x: [1, 2, 3, 4], y: [56, 47, 75, 44]})
  if (typeof m1[type] != "function") {
    let error = {
      error: "Not Found"
    }
    res.send(JSON.stringify(error))
    return false
  }
  let data = {
    x: [],
    y: [],
    type: "scatter",
    name: type
  }
  for (let i = -iterations; i <= iterations; i++) {
    //data.y.push(m1[type](i / 10))
    if (type == "minimize") {
      data.y.push(m1[type](i/10).w1)
    } else data.y.push(m1[type](i/10))
    data.x.push(i)
    if (i === iterations) res.send(JSON.stringify(data))
  }
})
