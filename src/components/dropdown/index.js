import React from 'react';

import Header from './Header';
import Content from './Content';

import './styles.css';

export default class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			data: []
		};

		this.open = this.open.bind(this);
	}

	open() {
		if (this.state.data == false) {

		}
	}

	render() {
		return (
			<div onClick = {this.open}>
				<Header title = {this.props.question['title']} />
				<Content content = {this.props.question} />
			</div>
		);
	}
}