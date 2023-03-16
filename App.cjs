const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const functions = require("firebase-functions");

const app = express();
const port = 3000;

const allowedOrigins = [
  'https://jcharpi.github.io',
  'http://localhost:3001'
];
// Enable CORS for all routes
app.use(cors({
  origin: allowedOrigins
}));

app.get('/location', async (req, res) => {
  try {
    const location = req.query.location
    const radius = req.query.radius
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=cafe&key=AIzaSyDzor3AfBqVGEEtLnHBCnwwGJ_4uRMHEJc`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch directions from Google');
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

exports.app = functions.https.onRequest(app);

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });