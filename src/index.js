import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown from './components/dropdown'
import SearchBar from './components/searchbar'

export default class App extends React.Component {
	render() {
		return (
			<div>
				<SearchBar />
				<Dropdown title = 'hello world' content = 'nice content' />
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