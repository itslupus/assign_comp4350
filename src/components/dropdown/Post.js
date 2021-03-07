import React from 'react';

import PostDetails from './PostDetails';

export default class Post extends React.Component {
	render() {
		return (
			<div className = 'post-wrapper'>
				<div className = 'post' dangerouslySetInnerHTML = {{__html: this.props.content.body}} />
				<PostDetails author = {this.props.content.owner.display_name} score = {this.props.content.score} link = {this.props.content.link} date = {this.props.content.creation_date} /> 
			</div>
		);
	}
}