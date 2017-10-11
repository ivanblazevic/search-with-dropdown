import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render(props) {
		return (
			<header class={style.header}>
				<img src="assets/images/logo.png" class={style.logo}/>
				{props.children}
			</header>
		);
	}
}
