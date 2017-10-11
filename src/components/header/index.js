import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import Search from './../search';

export default class Header extends Component {

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

	render(props) {
		return (
			<header class={style.header}>
				<img src="assets/images/logo.png" class={style.kita}/>
				<Search filters={this.filters} onUpdate={this.onFilterUpdate} />
			</header>
		);
	}
}
