import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { Search } from './../search';
import style from './style.less';

export default class Header extends Component {

	constructor() {
		super();
	}

	render(props) {
		return (
			<header class={style.header}>
				<img src="assets/images/logo.png" class={style.kita}/>
				{props.children}
			</header>
		);
	}
}
