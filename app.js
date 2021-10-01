const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://7157d93e-0ee0-4-231-b9ee:HSfyPrZDGHJ1VhCuHGcOqDHmQgigirkRNuJPxaOmDkaNWt5hMbjfaMQVV4JImgXokR0HID4dV4uONaH2hKCSrA==@7157d93e-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/mk-kaffee?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@7157d93e-0ee0-4-231-b9ee@";

app.get('/', (req, res) => {
  res.send('Hello Kitty2!')
})

app.get('/test/', (req, res) => {
  res.send('Hello Test!')
})

// app.post('/automat', (req, res) => {
//   res.json({requestBody: req.body})
//   res.send('Dzięki za kawę')
// })

app.post('/automat', (req, res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mk-kaffee");
      dbo.collection("cafeMachines").insertOne({
          state: req.body.state
      }, 
      function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
})

app.put('/cafeMachinesTestPUT', (req, res) => {
  res.json({requestBody: req.body})
})

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log('Connected to Database');
})

app.put('/cafeMachines', (req, res) => {
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      res.send('Connected to Database');
      var dbo = db.db("mk-kaffee");
      dbo.collection("cafeMachines").insertOne({
          id: req.body.id,
          state: req.body.state
      }, 
      function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
})

// const cafeMachines = [
//   {
//     cafeMachineName: 'Closest kitchen',
//     id: 0,
//     state: 0
//   },
//   {
//     cafeMachineName: 'Other kitchen',
//     id: 1,
//     state: 1
//   }
// ];

app.get('/cafemachines/:id', (req, res) => {
  // res.send(cafeMachines.find(cm=> cm.id == req.params.id));
  const cm = cafeMachines.find(cm=> cm.id == req.params.id);
  res.send(`Coffee machine is ${cm.state ? 'OK' : 'probably empty'}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})