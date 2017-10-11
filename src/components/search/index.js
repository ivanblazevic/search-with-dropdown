import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { Config } from './config';
import Section from './../section';
import { pluck, filter, chain, find } from 'underscore';

const Selectable = props => (
	<div class={props.isTwoColumn ? style.sectionContainerItemTwo : style.sectionContainerItem } onClick={props.onClick}>
		<div className={props.filter.getClass()}>
			{
				props.filter.isSelected() ? <props.filter.iconSelected/> : <props.filter.icon/>
			}
			<span class={style.filterName}>{props.filter.name}</span>
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

	updateState() {
		this.setState({
			filters: chain(this.filters)
						.filter((f) => { return f.selected == true })
						.pluck('value')
						.value()
		});
		this.setState({
			sortBy: chain(this.sortBy)
						.filter((f) => { return f.selected == true })
						.pluck('value')
						.first()
						.value()
						.toLowerCase()
		});
	}

	updateSortBy = (filter) => {
		var current = find(this.sortBy, (f) => { return f.isSelected() });
		current.setSelected(false);
		filter.setSelected(true);
		this.updateState();
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
		this.updateState();
	}

	updateQuery = e => {
		this.setState({ query: e.target.value });
	}

	updateFrom = e => {
		this.setState({ priceFrom: e.target.value });
	}

	updateTo = e => {
		this.setState({ priceTo: e.target.value });
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.updateState();
		this.props.onUpdate(this.state);
		this.setState({query: ''});
	}

	render = () => {

		var categories = []
		this.filters.map(function(filter) {
			categories.push(<Selectable onClick={this.updateFilter.bind(this, filter)} filter={filter} />)
		}, this)

		var sortBy = []
		this.sortBy.map(function(filter) {
			sortBy.push(<Selectable onClick={this.updateSortBy.bind(this, filter)} filter={filter} isTwoColumn />)
		}, this)

		return (
			<form onSubmit={this.onSubmit} class={style.search}>

				<input className={ this.state.query ? style.isActive: null } placeholder="Search..." type="text" value={this.state.query} onInput={this.updateQuery} />

				{ this.state.query ?

					<div class={style.dropdown}>

						<Section title="Categories">
							{categories}
						</Section>

						<Section title="Sort By">
							{sortBy}
						</Section>

						<Section title="Price Range">

							<div class={style.sectionContainerItem}>
								<input placeholder="From..." type="number" value={this.state.priceFrom} onInput={this.updateFrom} />
							</div>

							<div class={style.sectionContainerItem}>
								<input placeholder="To..." type="number" value={this.state.priceTo} onInput={this.updateTo} />
							</div>

						</Section>

					</div>

					: null
				}

				<input type="submit" hidden />

			</form>
		);
	}
}
