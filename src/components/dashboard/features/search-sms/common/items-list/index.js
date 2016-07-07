import styles from "./item-list.less";

const template = `
  <div class="${ styles.component }">
      <span class="${ styles.item }" ng-repeat="item in $ctrl.items track by $index">
          <a class="${ styles.link }"
             ng-click="$ctrl.removeItem($index)">
                  <span class="${ styles.text }" ng-bind="item"></span>
                  <span class="${ styles.text }">[×]</span>
          </a>
      </span>
  </div>
`;

const bindings = { items: '<', onRemove: '&' };

class controller {
  constructor() {
    this.styles = styles;
  }

  $onChanges( changes ) {
    if ( changes.items.isFirstChange() ) return;
    if ( changes.items ) this.items = angular.copy( this.items );
  }

  removeItem( index ) {
    const $event = { index };
    this.onRemove( { $event } );
  }
}

export default angular

  .module('SS Items List Module', [])

  .component('itemsList', { bindings, template, controller })

  .name;
