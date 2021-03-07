import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown from './components/dropdown'
import SearchBar from './components/searchbar'

const FILTER = '!FRQGwXxmUtU64ejIEZQvfWBDz0*VIkJeHHyC7OzXp3k)QJFEGO*OkdhTqYH0pPKyRE0uhUqu';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			questions: [],
			fetch_time: 0.0,
			state_message: ''
		};

		this.get_questions = this.get_questions.bind(this);
	}

	async fetch_new_questions(date, tag) {
		let url_new_questions = 'https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=' + date + '&tagged=' + tag + '&order=desc&sort=creation&site=stackoverflow&filter=' + FILTER;
		
		let result;
		await fetch(url_new_questions).then((response) => {
			if (response.ok === true) result = response.json();
		});

		return result;
	}

	async fetch_top_questions(date, tag) {
		let url_top_questions = 'https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=' + date + '&tagged=' + tag + '&order=desc&sort=votes&site=stackoverflow&filter=' + FILTER;
		
		let result;
		await fetch(url_top_questions).then((response) => {
			if (response.ok === true) result = response.json();
		});

		return result;
	}

	async get_questions(data) {
		this.setState({state_message: 'loading...'});

		let start_time = Date.now();
		let last_week_to_date = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);

		let new_questions = await this.fetch_new_questions(last_week_to_date, data);
		let top_questions = await this.fetch_top_questions(last_week_to_date, data);

		if (new_questions !== undefined && top_questions !== undefined) {
			this.setState({state_message: ''});

			let questions = new_questions['items'].concat(top_questions['items']);
			questions.sort((first, second) => {
				return second['creation_date'] - first['creation_date'];
			});

			this.setState({
				questions: questions,
				state_message: ''
			});
		} else {
			this.setState({state_message: 'network error, or no questions found'});
		}

		this.setState({fetch_time: (Date.now() - start_time) / 1000.0});
	}

	render() {
		return (
			<div>
				<SearchBar query = {this.get_questions} />
				<p>{this.state.state_message}</p>
				{
					this.state.questions.map((question) => {
						return <Dropdown question = {question} />
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