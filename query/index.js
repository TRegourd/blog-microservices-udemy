const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', async (req, res) => {
	console.log('Received event', req.body.type);

	res.send({});
});

app.listen(4002, () => {
	console.log('Listening on 4002');
});
