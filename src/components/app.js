import { h, Component } from 'preact';
import { Router } from 'preact-router';
import jsonPretty from 'json-pretty';
import Search from './search';
import Header from './header';
import Home from './home';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor() {
		super();
		this.filterResult = [];
	}

	onFilterUpdate = (filterResult) => {
		this.setState({ filterResult: filterResult });
		console.log(jsonPretty(filterResult));
	}

	render = () => {
		return (
			<div id="app">
				<Header>
					<Search onUpdate={this.onFilterUpdate} />
				</Header>
				<Router onChange={this.handleRoute}>
					<Home path="/" filterResult={this.state.filterResult} />
				</Router>
			</div>
		);
	}
}
