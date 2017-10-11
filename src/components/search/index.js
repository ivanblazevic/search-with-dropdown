import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { Filter } from './filter';
import { Section } from './../section';
import { pluck, filter, chain } from 'underscore';

export default class Search extends Component {

	constructor(props) {
		super(props);

		this.state = { query: '' };
		this.filters = [];

		this.props.filters.forEach(function(e) {
			this.filters.push(new Filter(e, e == 'Everything'));
		}, this);

	}

	updateFilter = e => {
		this.setState({
			filters: chain(this.filters)
						.filter(function(f) { return f.selected == true })
						.pluck('name')
						.value()
		});
		this.props.onUpdate(this.state);
	}

	updateText = e => {
		this.setState({ query: e.target.value });
		this.props.onUpdate(this.state);
	}

	render = () => {
		return (
			<form onSubmit={this.handleSubmit} class={style.search}>

				<input placeholder="Search..." style="display: inline-block;" type="text" value={this.state.query} onInput={this.updateText} />

				{ this.state.query || true  ?

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
