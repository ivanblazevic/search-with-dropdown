import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { Filter } from './filter';
import Section from './../section';
import { pluck, filter, chain } from 'underscore';
import FaCircleO from 'preact-icons/lib/fa/circle-o';
import FaDotCircleO from 'preact-icons/lib/fa/dot-circle-o';

import FaChevronUp from 'preact-icons/lib/fa/chevron-up';
import FaChevronDown from 'preact-icons/lib/fa/chevron-down';


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
		this.filters = [];

		this.props.filters.forEach(function(e) {
			this.filters.push(new Filter(e, FaCircleO, FaDotCircleO));
		}, this);

		this.sortBy = [
			new Filter('Distance', FaCircleO, FaDotCircleO),
			new Filter('Date', FaCircleO, FaDotCircleO),
			new Filter('Price', FaChevronUp, FaChevronUp, 'PriceUp'),
			new Filter('Price', FaChevronDown, FaChevronDown, 'PriceDown')
		]

	}

	updateSortBy = (filter) => {
		filter.isSelected() ? filter.setSelected(false) : filter.setSelected(true);
		this.setState({
			sortBy: chain(this.sortBy)
						.filter(function(f) { return f.selected == true })
						.pluck('value')
						.first()
						.value()
		});
		this.props.onUpdate(this.state);
	}

	updateFilter = (filter, a) => {
		if (filter.name != "Everything") {
			this.filters[0].setSelected(false);
		} else {
			this.filters.forEach(function(f) {
				f.setSelected(false);
			})
		}
		filter.isSelected() ? filter.setSelected(false) : filter.setSelected(true);

		this.setState({
			filters: chain(this.filters)
						.filter(function(f) { return f.selected == true })
						.pluck('value')
						.value()
		});
		this.props.onUpdate(this.state);
	}

	updateText = e => {
		this.setState({ query: e.target.value });
		this.props.onUpdate(this.state);
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

				<input placeholder="Search..." style="display: inline-block;" type="text" value={this.state.query} onInput={this.updateText} />

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
								<div class={style.filterContainer}>
									<i></i><span>test 1</span>
								</div>
							</div>

							<div class={style.sectionContainerItem}>
								<div class={style.filterContainer}>
									<i></i><span>test 2</span>
								</div>
							</div>

						</Section>

					</div>

					: null
				}

			</form>
		);
	}
}
