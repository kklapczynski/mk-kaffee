const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use( bodyParser.json()); 
const port = process.env.PORT || 3000;
const data = require('./data')

const cafeMachines = [
  {
    cafeMachineName: 'The around the corner kitchen',
    id: 0,
    state: 0,
    stateDateTime: '2021-10-03 22:00'
  },
  {
    cafeMachineName: 'That other kitchen',
    id: 1,
    state: 1,
    stateDateTime: '2021-10-03 22:00'
  },
  {
    cafeMachineName: 'The far far away kitchen',
    id: 2,
    state: 1,
    stateDateTime: '2021-10-03 22:00'
  }
];

const dbConnected = data.connectToDatabase();

app.get('/', (req, res) => {
  res.send('Hello Kitty2!')
})

app.post('/cafemachines', async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    const newItem = [req.body];
    await data.insertCafeMachines(newItem);
  } else {
    console.log('req.body');
    console.log(req.body);
    console.log('Object.keys(req.body)');
    console.log(Object.keys(req.body));
  }
})

app.put('/cafemachines', async (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    res.send(await data.findAndUpdateCafeMachine(req.body.id, req.body.state));
  } else {
    console.log('req.body');
    console.log(req.body);
    console.log('Object.keys(req.body)');
    console.log(Object.keys(req.body));
  }
})

app.get('/cafemachines/:id', async (req, res) => {
  res.send(await data.findCafeMachines(req.params.id));
})

app.get('/cafemachines', async (req, res) => {
  res.send(await data.findCafeMachines());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})