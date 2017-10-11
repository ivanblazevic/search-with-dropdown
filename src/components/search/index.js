import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';
import { Filter } from './filter';
import Section from './../section';
import { pluck, filter, chain } from 'underscore';
import FaCircleO from 'preact-icons/lib/fa/circle-o';
import FaDotCircleO from 'preact-icons/lib/fa/dot-circle-o';

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

						<Section title="Filter">
							{
								this.filters.map(function(player) {
									return (
										<div class={style.sectionContainerItem}>
											<div onClick={player.onClick.bind(player, this)} className={player.getClass()}>
												{
													player.isSelected() ? <FaDotCircleO/> : <FaCircleO/>
												}
												<span style="margin-left: 2px">{player.name}</span>
											</div>
										</div>
									)
								}, this)
							}
						</Section>

						<Section title="Sort By">

							<div class={style.sectionContainerItemTwo}>
								<div class={style.filterContainer}>
									<i></i><span>Distance</span>
								</div>
							</div>

							<div class={style.sectionContainerItemTwo}>
								<div class={style.filterContainer}>
									<i></i><span>Date</span>
								</div>
							</div>

							<div class={style.sectionContainerItemTwo}>
								<div class={style.filterContainer}>
									<i></i><span>Price</span>
								</div>
							</div>

							<div class={style.sectionContainerItemTwo}>
								<div class={style.filterContainer}>
									<i></i><span>Price</span>
								</div>
							</div>

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
