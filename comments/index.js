const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	const postId = req.params.id;

	const comments = commentsByPostId[postId] || [];

	res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const postId = req.params.id;
	const { content } = req.body;

	const comments = commentsByPostId[postId] || [];

	comments.push({ id: commentId, content, status: 'pending' });

	commentsByPostId[postId] = comments;

	await axios
		.post('http://event-bus-clusterip-srv:4005/events', {
			type: 'CommentCreated',
			data: {
				id: commentId,
				content,
				postId: postId,
				status: 'pending',
			},
		})
		.catch((err) => {
			console.log(err);
		});

	res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
	console.log('Received event', req.body.type);

	const { type, data } = req.body;

	if (type === 'CommentModerated') {
		const { id, postId, status, content } = data;
		const comments = commentsByPostId[postId];
		const comment = comments.find((comment) => {
			return comment.id === id;
		});
		comment.status = status;

		await axios
			.post('http://event-bus-clusterip-srv:4005/events', {
				type: 'CommentUpdated',
				data: {
					id: id,
					content,
					postId,
					status,
				},
			})
			.catch((err) => {
				console.log(err);
			});
	}

	res.send({});
});

app.listen(4001, () => {
	console.log('Listening on 4001');
});
