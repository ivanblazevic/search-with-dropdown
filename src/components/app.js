import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Search from './search';
import Header from './header';
import Home from './home';
import Profile from './profile';

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

		this.filters = [
			"Everything",
			"New in your area",
			"Fashion and Accessories",
			"Home and Garden",
			"Electronics",
			"Baby and Child",
			"Sport, Leisure and Games",
			"Movies, Books and Music",
			"Cars and Motors",
			"Property",
			"Services",
			"Other"
		]

		//console.log(prettyFormat(this.filters));
	}

	onFilterUpdate = (filterResult) => {
		this.filterResult = filterResult;
		this.forceUpdate();
	}

	render() {
		return (
			<div id="app">
				<Header>
					<Search filters={this.filters} onUpdate={this.onFilterUpdate} />
				</Header>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
