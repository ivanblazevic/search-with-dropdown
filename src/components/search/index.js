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


const FilterItem = props => (
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

		this.filters.onClick = function(filter) {
			/*
			if (this.name != "Everything") {
				var everythingFilter = find(e.filters, function(i) { return i.name == "Everything" });
				everythingFilter.setSelected(false);
			} else {
				// deselect all filters if EVERYTHING filter is selected
				e.filters.forEach(function(f) {
					f.setSelected(false);
				})
			}
			*/
			filter.isSelected() ? filter.setSelected(false) : filter.setSelected(true);
			this.updateFilter();
		}

		this.sortBy = {
			distance: new Filter('Distance', FaCircleO, FaDotCircleO),
			date: new Filter('Date', FaCircleO, FaDotCircleO),
			priceFrom: new Filter('Price', FaChevronUp, FaChevronUp, 'PriceUp'),
			priceTo: new Filter('Price', FaChevronDown, FaChevronDown, 'PriceDown')
		}

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

	test = e => {
		console.log('kaj')
	}

	render = () => {
		return (
			<form onSubmit={this.handleSubmit} class={style.search}>

				<input placeholder="Search..." style="display: inline-block;" type="text" value={this.state.query} onInput={this.updateText} />

				{ this.state.query || true  ?

					<div class={style.dropdown}>

						<Section title="Filter">
							{
								this.filters.map(function(filter) {
									return (<FilterItem onClick={this.filters.onClick.bind(this, filter)} filter={filter} />)
								}, this)
							}
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
