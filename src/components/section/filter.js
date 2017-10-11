import style from './style.less';
import { find } from 'underscore';

export class Filter {

	constructor(name, isSelected) {
		this.name = name;
		this.selected = !!isSelected;
	}

	isSelected = () => {
		return !!this.selected;
	}

	setSelected = (isSelected) => {
		this.selected = isSelected;
	}

	onClick = (e) => {
		if (this.name != "Everything") {
			var everythingFilter = find(e.filters, function(i) { return i.name == "Everything" });
			everythingFilter.setSelected(false);
		} else {
			// deselect all filters if EVERYTHING filter is selected
			e.filters.forEach(function(f) {
				f.setSelected(false);
			})
		}
		this.isSelected() ? this.setSelected(false) : this.setSelected(true);
		e.updateFilter();
	}

	getClass = () => {
		if (this.selected) {
			return style.filterContainer + ' ' + style.active;
		} else {
			return style.filterContainer;
		}
	}

}
