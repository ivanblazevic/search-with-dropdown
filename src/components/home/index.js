import { h, Component } from 'preact';
import style from './style.less';
import Search from './../search';
import prettyFormat from 'pretty-format';

export default class Home extends Component {

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

		console.log(prettyFormat(this.filters));
	}

	onFilterUpdate = (filterResult) => {
		this.filterResult = filterResult;
		this.forceUpdate();
	}

	render() {
		return (

			<div class={style.home}>

				<Search filters={this.filters} onUpdate={this.onFilterUpdate} />

				<pre>{prettyFormat(this.filterResult)}</pre>

			</div>
		);
	}

}
