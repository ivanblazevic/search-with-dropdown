import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Search extends Component {

	constructor() {
		super();
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		//console.log(event.target.value)
		//this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}

	updateText = e => {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} class={style.search}>

				<input type="text" value={this.state.value} onInput={this.updateText} />

				{ this.state.value || !this.state.value  ?

					<div class={style.dropdown}>
						<label>Filters</label>

						<div class={style.sectionContainer}>
							<div class={style.sectionContainerItem}>a</div>
							<div class={style.sectionContainerItem}>b</div>
							<div class={style.sectionContainerItem}>c</div>
							<div class={style.sectionContainerItem}>d</div>
							<div class={style.sectionContainerItem}>e</div>
						</div>

						<div class={style.sectionContainer}>
							<div class={style.sectionContainerItem}>a</div>
							<div class={style.sectionContainerItem}>b</div>
						</div>

						fils

					</div>

					: null
				}

			</form>
		);
	}
}
