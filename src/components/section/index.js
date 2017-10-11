import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Section extends Component {


	constructor() {
		super();

		console.log("df", Component)
	}

	render = () => {
		return (
			<div>
				<label style="font-size: 20px;margin: 6px 0;display: inline-block;">sdf</label>
				<div class={style.sectionContainer}>

				</div>
			</div>
		);
	}
}
