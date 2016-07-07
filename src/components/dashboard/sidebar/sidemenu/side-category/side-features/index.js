import styles from './side-features.less';

const template = `
<div class="${ styles.component }">
    <ul class="${ styles.features }">
        <li ng-repeat="feature in $ctrl.features track by $index">
            <a ng-if="!$ctrl.isSubMenu(feature) && !feature.url"
               ng-href="{{ $ctrl.category }}/{{ feature.id }}"
               ng-class="$ctrl.isActive(feature.id)"
            >
                {{ feature.title }} [new]
            </a>

            <div ng-if="$ctrl.isSubMenu(feature)">
                <a  ng-class="$ctrl.isActive(feature.id)"
                    ng-click="$ctrl.selectFeature(feature.id)">
                        {{ feature.title }} [new]
                </a>
                <side-submenu
                    ng-show="$ctrl.isSelected(feature.id)"
                    category="{{ $ctrl.category }}"
                    features="feature.features">
                </side-submenu>
            </div>

            <!--old features-->
            <a ng-if="!$ctrl.isSubMenu(feature) && feature.url"
               ng-href="{{ feature.url }}"
               ng-class="$ctrl.isActive(feature.id)"
               ng-bind="feature.title"
               target="_blank"
            ></a>
        </li>
    </ul>
</div>
`;

const bindings = { features: '<', category: '@' };

class controller {
  
  constructor( sidemenuActions ) {
    this.actions = sidemenuActions;
  }

  isSubMenu( feature ) {
    return 'features' in feature;
  }

  isActive( id ) {
    return this.actions.item === id ? styles.active : '';
  }

  selectFeature( id ) {
    if ( this.actions.item === id ) {
      this.actions.item = null;
      this.actions.subitem = null;
      return;
    }
    this.actions.item = id;
  }

  isSelected( id ) {
    return this.actions.item === id;
  }
}

export default angular
  
    .module('Side Features Module', [ 
      require('./side-submenu').default
    ])
    .component('sideFeatures', { bindings, template, controller })
    .name;
