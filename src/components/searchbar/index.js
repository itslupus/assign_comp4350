import React from 'react';

import './styles.css';

export default class SearchBar extends React.Component {
	constructor(props){
		super(props);

		this.state = {input: ''};

		this.input = this.input.bind(this);
		this.handle = this.handle.bind(this);
	}

	input(event) {
		this.setState({input: event.target.value});
	}

	handle(event) {
		if (this.state.input !== '') {
			this.props.query(this.state.input);
		}

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit = {this.handle}>
				<input onChange = {this.input} placeholder = 'eg. javascript, python' />
				<button onClick = {this.handle}>search</button>
			</form>
		);
	}
}