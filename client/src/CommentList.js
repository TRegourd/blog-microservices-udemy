import React from 'react';

const CommentList = ({ comments }) => {
	const renderedComments = comments.map((comment) => {
		let content;

		if (comment.status === 'approved') {
			content = comment.content;
		}
		if (comment.status === 'rejected') {
			content = 'Rejected';
		}
		if (comment.status === 'pending') {
			content = 'Pending';
		}
		return <li key={comment.id}>{content}</li>;
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
