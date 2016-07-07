import angular from 'angular';
import styles from './styles.less';

// Callbacks
import onInputFocus from './callbacks/on-input-focus';
import onInputBlur from './callbacks/on-input-blur';
import onInputChange from './callbacks/on-input-change';
import onItemSelect from './callbacks/on-item-select';

export default function(scope, element, attrs, ctrl) {

  angular.extend(scope, {
    styles,
    isShowItems: false,
    pressedDropdown: false,
    selectedItem: null,
    actions: ctrl.actions,

    // Callbacks
    onInputFocus: onInputFocus.bind(scope),
    onInputBlur: onInputBlur.bind(scope),
    onItemSelect: onItemSelect.bind(scope),
    onItemPress: () => scope.pressedDropdown = true,
    loadMore: () => (!ctrl.actions.fetching && ctrl.actions.fetch({ scroll: true })),
  });

  scope.$watch('inputModel', onInputChange.bind(scope));

  scope.$watch(
    () => ctrl.actions.items,
    items => scope.items = items
  );

}
