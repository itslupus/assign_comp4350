import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown from './components/dropdown'
import SearchBar from './components/searchbar'

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: [],
			fetch_time: 0.0,
			state_message: ''
		};

		this.get_questions = this.get_questions.bind(this);
		this.update_query_time = this.update_query_time.bind(this);
	}

	get_questions(data) {
		this.setState({state_message: 'loading...'});

		let start_time = Date.now();

		fetch('http://localhost:8080/GetQuestions.php?tag=' + data)
		.then((response) => {
			if (response.ok === true) return response.json();

			this.setState({state_message: 'failed to fetch questions'});
		})
		.then((data) => {
			this.setState({
				questions: data,
				state_message: ''
			});

			this.update_query_time((Date.now() - start_time) / 1000.0);
		});
	}

	update_query_time(time) {
		this.setState({fetch_time: time});
	}

	render() {
		return (
			<div>
				<SearchBar query = {this.get_questions} />
				<p>{this.state.state_message}</p>
				{
					this.state.questions.map((question) => {
						return <Dropdown question = {question} update_time = {this.update_query_time} />
					})
				}
				<p><i>last query took {this.state.fetch_time} seconds</i></p>
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);