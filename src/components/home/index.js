import { h, Component } from 'preact';
import style from './style.less';
import jsonPretty from 'json-pretty';

export default class Home extends Component {
	render(props) {
		return (
			<div class={style.home}>
				<pre>{jsonPretty(this.props.filterResult)}</pre>
			</div>
		);
	}
}
