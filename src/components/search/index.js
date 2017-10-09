import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { find } from 'underscore';

export default class Search extends Component {

	constructor() {
		super();
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.filters = [
			/*
			{
				name: "Everything",
				selected: true
			},
			{
				name: "New in your area",
				selected: false
			},
			{
				name: "Fashion and Accessories",
				selected: false
			},
			{
				name: "Home and Garden",
				selected: false
			},
			{
				name: "Electronics",
				selected: false
			},
			{
				name: "Baby and Child",
				selected: false
			},
			{
				name: "Sport, Leisure and Games",
				selected: false
			},
			{
				name: "Movies, Books and Music",
				selected: false
			},
			{
				name: "Cars and Motors",
				selected: false
			},
			{
				name: "Property",
				selected: false
			},
			{
				name: "Services",
				selected: false
			},*/
			{
				name: "Other",
				selected: false,
				onClick: function(e) {

					this.selected = true;

					e.setState({ selected: true })


				},
				getClass: function() {

					if (this.selected) {
						return style.filterContainer + ' ' + style.active;
					} else {
						return style.filterContainer;
					}


				}
			}
		]

		this.filters.onClick = function() {
			console.log('kaj');
		}

		console.log(find(this.filters, function(i) { return i.name == "Everything" }));

	}

	onSelectFilter = e => {
		console.log(e)
		this.setState({selected: true});
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
		console.log(this.filters)
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
											<div onClick={player.onClick.bind(player, this)} className={player.getClass()}>
												<i></i><span>{player.name}</span>
											</div>
										</div>
									)
								}, this)
							}
						</div>

					</div>

					: null
				}

			</form>
		);
	}
}
