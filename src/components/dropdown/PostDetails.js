import React from 'react';

export default class PostDetails extends React.Component {
    pretty_date(epoch) {
        return new Date(epoch * 1000).toLocaleString();
    }

	render() {
		return (
			<div className = 'post-details'>
                <p><b>{this.props.score}</b></p>
                <p>{this.props.author}</p>
                <p>{this.pretty_date(this.props.date)}</p>
                <a href = {this.props.link} className = 'link' target = '_blank' ref = 'noreferrer'>{this.props.link}</a>
            </div>
		);
	}
}