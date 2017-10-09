import { h, Component } from 'preact';
import style from './style.less';
import Search from './../search';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>

				<Search />

			</div>
		);
	}
}
