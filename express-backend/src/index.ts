const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");

require("dotenv").config();
const port = process.env.PORT || 3000;

//Use express to listen to port
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

//configure cors
const cors = require("cors");
let corsOptions = {
  origin: ['http://localhost:4200']
}
app.use(cors(corsOptions));

//use to parse JSON bodies: JSON.parse(data)
app.use(express.json());

//Read json file
const jsonPath = path.join(__dirname, "coffee-drinks.json");

import { IRank } from '../../angular-frontend/src/app/models/IRank';

let ranks: IRank[] = [];

//parse out ranks
fs.readFile(jsonPath, function (err: any, data: any) {
  if (err) {
    console.log('Unable to read json data file: ' + jsonPath);
    console.log(jsonPath);
  } else {
    ranks = JSON.parse(data);
  }
});

// GET endpoint returning all ranks
app.get('/ranks', function(req: any, res: any) {
  res.status(200);
  return res.json(ranks);
});

// DELETE endpoint
app.delete("/ranks/:id", (req: any, res: any) => {
  if (req.params.id) {
    const rank = ranks.find((c) => c.id == req.params.id);
    if (rank) {
      delete rank.id;
      delete rank.drink;
      delete rank.cafe;
      delete rank.location;
      delete rank.rating;
      delete rank.ratingRemainder;
      delete rank.comment;
      res.status(200);
      return res.json(ranks);
    }
  }
  res.status(404);
  return res.json({ error: `Drink with id: ${req.params.id} not found.` });
});