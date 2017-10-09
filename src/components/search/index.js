import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Search extends Component {

	constructor() {
		super();
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.filters = [
			{
				name: "Everything"
			},
			{
				name: "New in your area"
			},
			{
				name: "Fashion and Accessories"
			},
			{
				name: "Home and Garden"
			},
			{
				name: "Electronics"
			},
			{
				name: "Baby and Child"
			},
			{
				name: "Sport, Leisure and Games"
			},
			{
				name: "Movies, Books and Music"
			},
			{
				name: "Cars and Motors"
			},
			{
				name: "Property"
			},
			{
				name: "Services"
			},
			{
				name: "Other"
			}
		]

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
						<label style="font-size: 20px;margin: 6px 0;display: inline-block;">Filters</label>

						<div class={style.sectionContainer}>
							{
								this.filters.map(function(player) {
   									return (
										<div class={style.sectionContainerItem}>
											<div class={style.filterContainer}>
												<i></i><span>{player.name}</span>
											</div>
										</div>
									)
								})
							}
						</div>

					</div>

					: null
				}

			</form>
		);
	}
}
