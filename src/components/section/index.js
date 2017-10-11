import { h, Component } from 'preact';
import style from './style.less';

export default class Section extends Component {
	render(props) {
		return (
			<div>
				<label style="font-size: 20px;margin: 6px 0;display: inline-block;">{props.title}</label>
				<div class={style.sectionContainer}>
					{props.children}
				</div>
			</div>
		);
	}
}
