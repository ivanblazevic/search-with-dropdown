import { Filter } from './filter';
import FaCircleO from 'preact-icons/lib/fa/circle-o';
import FaDotCircleO from 'preact-icons/lib/fa/dot-circle-o';
import FaChevronUp from 'preact-icons/lib/fa/chevron-up';
import FaChevronDown from 'preact-icons/lib/fa/chevron-down';

export class Config {

	constructor() {
		this.categoryList = [
			"Everything",
			"New in your area",
			"Fashion and Accessories",
			"Home and Garden",
			"Electronics",
			"Baby and Child",
			"Sport, Leisure and Games",
			"Movies, Books and Music",
			"Cars and Motors",
			"Property",
			"Services",
			"Other"
		]
	}

	getCategories = () => {
		var categories = [];
		this.categoryList.forEach((e) => {
			categories.push(new Filter(e, FaCircleO, FaDotCircleO));
		});
		return categories;
	}

	getSortBy = () => {
		return [
			new Filter('Distance', FaCircleO, FaDotCircleO),
			new Filter('Date', FaCircleO, FaDotCircleO),
			new Filter('Price', FaChevronUp, FaChevronUp, 'PriceUp'),
			new Filter('Price', FaChevronDown, FaChevronDown, 'PriceDown')
		]
	}


}
