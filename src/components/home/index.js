import { h, Component } from 'preact';
import style from './style.less';
import Search from './../search';
import prettyFormat from 'pretty-format';

export default class Home extends Component {
	
	render() {
		return (

			<div class={style.home}>

				<pre>{prettyFormat(this.filterResult)}</pre>

			</div>
		);
	}

}
