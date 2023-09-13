const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
	const event = req.body;

	events.push(event);

	await axios
		.post('http://posts-clusterip-srv:4000/events', event)
		.catch((err) => {
			console.log(err);
		});
	await axios
		.post('http://comments-clusterip-srv:4001/events', event)
		.catch((err) => {
			console.log(err);
		});
	await axios
		.post('http://query-clusterip-srv:4002/events', event)
		.catch((err) => {
			console.log(err);
		});
	await axios
		.post('http://moderation-clusterip-srv:4003/events', event)
		.catch((err) => {
			console.log(err);
		});

	res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
	res.send(events);
});

app.listen(4005, () => {
	console.log('Listening on 4005');
});
