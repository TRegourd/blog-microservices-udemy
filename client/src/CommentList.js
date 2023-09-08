import React from 'react';

const CommentList = ({ comments }) => {
	const renderedComments = comments.map((comment) => {
		let content;

		if (comment.status === 'approved') {
			content = comment.content;
		}
		if (comment.status === 'rejected') {
			content = 'This comment have been rejected';
		}
		if (comment.status === 'pending') {
			content = 'Your comment is pending for moderation';
		}
		return <li key={comment.id}>{content}</li>;
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
