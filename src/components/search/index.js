import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { Config } from './config';
import Section from './../section';
import { pluck, filter, chain, find } from 'underscore';
import FaSearch from 'preact-icons/lib/fa/search';

const Selectable = props => (
	<div class={props.isTwoColumn ? style.sectionContainerItemTwoCol : style.sectionContainerItem } onClick={props.onClick}>
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
		// initialize selection
		this.sortBy[0].setSelected(true); // select distance by defaut
		this.filters[0].setSelected(true); // select 'Everything' category by default
	}

	showDropdown() {
		return this.state.query && !this.submitted;
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

	updateCategory = (filter, a) => {
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
		this.submitted = false;
		this.setState({ query: e.target.value });
	}

	updatePriceFrom = e => {
		this.setState({ priceFrom: e.target.value });
	}

	updatePriceTo = e => {
		this.setState({ priceTo: e.target.value });
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.updateState();
		this.props.onUpdate(this.state);
		this.submitted = true;
	}

	render = () => {

		var categories = []
		this.filters.map(function(filter) {
			categories.push(<Selectable onClick={this.updateCategory.bind(this, filter)} filter={filter} />)
		}, this)

		var sortBy = []
		this.sortBy.map(function(filter) {
			sortBy.push(<Selectable onClick={this.updateSortBy.bind(this, filter)} filter={filter} isTwoColumn />)
		}, this)

		return (
			<form onSubmit={this.onSubmit} class={style.search}>

				<div class={style.inputContainer}>
					<span onClick={this.onSubmit} class={style.inputIconContainer}><FaSearch/></span>
					<input className={ this.showDropdown() ? style.isActive: null } placeholder="Search..." type="text" value={this.state.query} onInput={this.updateQuery} />
				</div>

				{ this.showDropdown() ?

					<div class={style.dropdown}>

						<Section title="Categories">
							{categories}
						</Section>

						<Section title="Sort By">
							{sortBy}
						</Section>

						<Section title="Price Range">

							<div class={style.sectionContainerItem}>
								<input placeholder="From..." type="number" value={this.state.priceFrom} onInput={this.updatePriceFrom} />
							</div>

							<div class={style.sectionContainerItem}>
								<input placeholder="To..." type="number" value={this.state.priceTo} onInput={this.updatePriceTo} />
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
