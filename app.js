const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Kitty2!')
})

app.get('/test/', (req, res) => {
  res.send('Hello Test!')
})

app.post('/automat', (req, res) => {
  res.send('Dzięki za kawę')
})

const cafeMachines = [
  {
    cafeMachineName: 'Closest kitchen',
    id: 0,
    state: 0
  },
  {
    cafeMachineName: 'Other kitchen',
    id: 1,
    state: 1
  }
];

app.get('/cafemachines/:id', (req, res) => {
  // res.send(cafeMachines.find(cm=> cm.id == req.params.id));
  const cm = cafeMachines.find(cm=> cm.id == req.params.id);
  res.send(`Coffee machine is ${cm.state ? 'OK' : 'probably empty'}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})