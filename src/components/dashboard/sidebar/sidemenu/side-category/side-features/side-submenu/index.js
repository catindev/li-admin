import styles from './side-submenu.less';

const bindings = { features: '<', category: '@' };

const template = `
  <div class="${ styles.component }">
      <ul class="${ styles.features }">
          <li ng-repeat="feature in $ctrl.features track by $index">
              <a ng-href="{{ feature.uri }}"
                 ng-class="$ctrl.isActive(feature.id)"
                 ng-bind="feature.title"
              ></a>
          </li>
      </ul>
  </div>
`;

class controller {
  constructor( sidemenuActions ) {
    this.actions = sidemenuActions;
  }

  isActive( id ) {
    return this.actions.subitem === id ? styles.active : '';
  }

  selectFeature( id ) {
    this.actions.subitem = id;
    return;
  }
}

export default angular
  
    .module('Side Submenu Module', [])
  
    .component('sideSubmenu', { bindings, template, controller })
  
    .name;
