import React from 'react';

import Comment from './Comment';
import Post from './Post';

export default class Content extends React.Component {
	constructor(props) {
		super(props);

		this.generate_comments = this.generate_comments.bind(this);
		this.generate_answer_comment_pairs = this.generate_answer_comment_pairs.bind(this);
	}

	generate_comments(source) {
		let comment_data = source;
		let comment_components = [];

		if (comment_data) {
			for (let comment of comment_data) {
				comment_components.push(<Comment comment = {comment} />)
			}
		}

		return comment_components;
	}

	generate_answer_comment_pairs() {
		let answer_data = this.props.content.answers;
		let components = [];

		if (answer_data) {
			for (let answer of answer_data) {
				components.push(<Post content = {answer} />)

				if (answer.comments) {
					components = components.concat(this.generate_comments(answer.comments));
				}
			}
		}

		return components;
	}

	render() {
		return (
			<div className = 'dropdown-content hidden'>
				<Post content = {this.props.content} />
				{
					this.generate_comments(this.props.content.comments)
				}
				{
					this.generate_answer_comment_pairs()
				}
			</div>
		);
	}
}