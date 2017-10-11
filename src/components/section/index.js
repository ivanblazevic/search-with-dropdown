import { h, Component } from 'preact';
import style from './style.less';

export default class Section extends Component {
	render(props) {
		return (
			<div>
				<label class={style.label}>{props.title}</label>
				<div class={style.sectionContainer}>
					{props.children}
				</div>
			</div>
		);
	}
}
