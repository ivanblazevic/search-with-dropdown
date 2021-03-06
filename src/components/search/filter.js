import style from './style.less';

export class Filter {

	constructor(name, icon, iconSelected, value) {
		this.name = name;
		this.icon = icon;
		this.iconSelected = iconSelected;
		this.value = value || name;
		this.selected = false;
	}

	isSelected = () => {
		return !!this.selected;
	}

	setSelected = (isSelected) => {
		this.selected = isSelected;
	}

	getClass = () => {
		if (this.selected) {
			return style.filterContainer + ' ' + style.active;
		} else {
			return style.filterContainer;
		}
	}

}
