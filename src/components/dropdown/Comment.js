import React from 'react';

import CommentDetails from './CommentDetails';

export default class Comment extends React.Component {
	render() {
		return (
			<div className = 'comment-wrapper'>
				<div className = 'comment' dangerouslySetInnerHTML = {{__html: this.props.comment.body}} />
				<CommentDetails author = {this.props.comment.owner.display_name} score = {this.props.comment.score}  date = {this.props.comment.creation_date} /> 
			</div>
		);
	}
}