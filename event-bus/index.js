const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
	const event = req.body;

	await axios.post('http://localhost:4000/events', event).catch((err) => {
		console.log(err);
	});
	await axios.post('http://localhost:4001/events', event).catch((err) => {
		console.log(err);
	});
	// axios.post('http://localhost:4002/events', event);

	res.send({ status: 'ok' });
});

app.listen(4005, () => {
	console.log('Listening on 4005');
});
