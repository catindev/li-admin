import angular from 'angular';
import styles from './styles.less';

const MAX_HEIGH = 160;


const link = (scope, element, attrs) => {

	let onKeyDownPress = event => {
		switch (event.which) {
			case 38: // up
				if ( !isListScroll() ) selectPreviousItem();
				break;
			case 40: // down
				if ( !isListScroll() ) selectNextItem();
				break;
			case 13: // return
				if (scope.dropdownVisible && scope.dropdownItems &&
					scope.dropdownItems.length > 0) {
					event.preventDefault();
					selectActiveItem();
				}
				break;
		}
	};

	let inputBlur = event => {
		if ( pressedDropdown ) {
		  pressedDropdown = false;
			return;
		}
		hideDropdown();
	};

	let selectItem = item => {
		scope.selectedItem = item;
		hideDropdown();
		if ( scope.onSelect ) scope.onSelect({item: item});
	};

	let dropdownPressed = () => pressedDropdown = true;

	let setActive = itemIndex => scope.activeItemIndex = itemIndex;

	let isActive = itemIndex => {
		if ( scope.activeItemIndex === itemIndex ) return styles.active;
		return '';
	}

	let inputChange = value => {

    // Crap: потому, что ng-change не срабатывает когда поле пустое
    scope.$watch( 'inputValue', (value, old) => {
      if (!value && old) scope.inputChange('');
    });

		scope.emptyFilter = false;
		scope.selectedItem = null;
		showDropdown();

		if ( !value ) {
			scope.dropdownItems = scope.items || [];
			return;
		}

		if ( scope.onChange ) scope.onChange({ input: scope.inputValue });

		if ( scope.filter ) {
			var promise = scope.filter({userInput: value});
			if (promise) {
				promise.then(filteredItems => {
					scope.dropdownItems = filteredItems;
					if ( filteredItems.length === 0 ) scope.emptyFilter = true;
				});
			}
		}
	};

	let inputFocus = () => {
    scope.inputValue = '';
    scope.selectItem(null);
		scope.setActive(0);
		showDropdown();
	};

	let onSelectItem = (newValue, oldValue) => {
		if ( newValue && !angular.equals(newValue, oldValue) ) {
			if (typeof newValue === 'string') {
				scope.inputValue = newValue;
			} else {
				scope.inputValue = newValue[ scope.titleKey || 'title'];
			}
		}
	};

	let onDropdownItems = (newValue, oldValue) => {
		if ( !angular.equals(newValue, oldValue) ) scope.setActive(0);
	};

	let showDropdown = () => scope.dropdownVisible = true;

	let hideDropdown = () => scope.dropdownVisible = false;

	let isListScroll = () => {
		let listHeight = element[0].querySelector(`.${styles.list}`).offsetHeight;
		return listHeight >= MAX_HEIGH;
	}

	let selectPreviousItem = () => {
		var prevIndex = scope.activeItemIndex - 1;
		if (prevIndex >= 0) scope.setActive(prevIndex);
	};

	let selectNextItem = () => {
		var nextIndex = scope.activeItemIndex + 1;
		if (nextIndex < scope.dropdownItems.length) scope.setActive(nextIndex);
	};

	let selectActiveItem = () => {
		if (scope.activeItemIndex >= 0 &&
				scope.activeItemIndex < scope.dropdownItems.length) {
			scope.selectItem( scope.dropdownItems[scope.activeItemIndex] );
		}
	};

	/* link */

	let pressedDropdown = false;

	angular.extend(scope, {

		// values
		activeItemIndex: 0,
		inputValue: '',
		dropdownVisible: false,
		dropdownItems: scope.items || [],
		emptyFilter: false,
		styles,

		// methods
		setActive,
		isActive,
		inputChange,
		inputFocus,
		inputBlur,
		dropdownPressed,
		selectItem,
		onKeyDownPress
	});

	scope.$watch('dropdownItems', onDropdownItems);
	scope.$watch('selectedItem', onSelectItem);
	scope.$watch('items', newItems => scope.dropdownItems = newItems || []);
}

export default link;
