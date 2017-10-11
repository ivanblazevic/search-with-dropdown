import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { Config } from './config';
import Section from './../section';
import { pluck, filter, chain, find } from 'underscore';

const Selectable = props => (
	<div class={style.sectionContainerItem} onClick={props.onClick}>
		<div className={props.filter.getClass()}>
			{
				props.filter.isSelected() ? <props.filter.iconSelected/> : <props.filter.icon/>
			}
			<span style="margin-left: 4px">{props.filter.name}</span>
		</div>
	</div>
);

export default class Search extends Component {

	constructor(props) {
		super(props);

		this.state = { query: '' };

		var config = new Config();
		this.filters = config.getCategories();
		this.sortBy = config.getSortBy();
		// set initial selection
		this.sortBy[0].setSelected(true);
		this.filters[0].setSelected(true);
	}

	update() {
		this.setState({
			sortBy: chain(this.sortBy)
						.filter((f) => { return f.selected == true })
						.pluck('value')
						.first()
						.value()
						.toLowerCase()
		});

		this.setState({
			filters: chain(this.filters)
						.filter((f) => { return f.selected == true })
						.pluck('value')
						.value()
		});

		this.props.onUpdate(this.state);
	}

	updateSortBy = (filter) => {
		var current = find(this.sortBy, (f) => { return f.isSelected() });
		current.setSelected(false);
		filter.setSelected(true);
		this.update();
	}

	updateFilter = (filter, a) => {
		if (filter.name != "Everything") {
			this.filters[0].setSelected(false);
		} else {
			this.filters.forEach((f) => {
				f.setSelected(false);
			})
		}
		filter.setSelected(!filter.isSelected());
		this.update();
	}

	updateQuery = e => {
		this.setState({ query: e.target.value });
		this.update();
	}

	updateFrom = e => {
		this.setState({ priceFrom: e.target.value });
		this.update();
	}

	updateTo = e => {
		this.setState({ priceTo: e.target.value });
		this.update();
	}

	render = () => {

		var categories = []
		this.filters.map(function(filter) {
			categories.push(<Selectable onClick={this.updateFilter.bind(this, filter)} filter={filter} />)
		}, this)

		var sortBy = []
		this.sortBy.map(function(filter) {
			sortBy.push(<Selectable onClick={this.updateSortBy.bind(this, filter)} filter={filter} />)
		}, this)

		return (
			<form onSubmit={this.handleSubmit} class={style.search}>

				<input placeholder="Search..." style="display: inline-block;" type="text" value={this.state.query} onInput={this.updateQuery} />

				{ this.state.query || true  ?

					<div class={style.dropdown}>

						<Section title="Filter">
							{categories}
						</Section>

						<Section title="Filter">
							{sortBy}
						</Section>

						<Section title="Price Range">

							<div class={style.sectionContainerItem}>
								<input placeholder="From..." style="display: inline-block;" type="number" value={this.state.priceFrom} onInput={this.updateFrom} />
							</div>

							<div class={style.sectionContainerItem}>
								<input placeholder="To..." style="display: inline-block;" type="number" value={this.state.priceTo} onInput={this.updateTo} />
							</div>

						</Section>

					</div>

					: null
				}

			</form>
		);
	}
}
