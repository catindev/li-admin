import link from './link';
import controller from './controller';
import template from './template.html';

const directive = {
	restrict: 'E',
	scope: {
		items: '=',
		titleKey: '@',
		inputRequired: '=',
		name: '@',
		placeholder: '@',
		classes: '@',
		filter: '&',
		onSelect: '&',
		onChange: '&',
		infinityScroll: '&'
	},
	template,
	controller,
	link,
};

export default () => directive;
