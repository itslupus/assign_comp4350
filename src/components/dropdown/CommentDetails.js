import React from 'react';

export default class CommentDetails extends React.Component {
    pretty_date(epoch) {
        return new Date(epoch * 1000).toLocaleString();
    }

	render() {
		return (
			<div className = 'comment-details'>
                <p><b>{this.props.score}</b></p>
                <p>{this.props.author}</p>
                <p>{this.pretty_date(this.props.date)}</p>
            </div>
		);
	}
}