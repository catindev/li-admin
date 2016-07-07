import styles from './side-category.less';

const template = `
  <div class="${ styles.sideCategory }">
      <a ng-if="$ctrl.data.url"
         ng-bind="$ctrl.data.title"
         ng-class="$ctrl.isActive()"
         ng-href="{{ $ctrl.data.url }}">
      </a>
      <a ng-if="!$ctrl.data.url"
         ng-bind="$ctrl.data.title"
         ng-class="$ctrl.isActive()"
         ng-click="$ctrl.onCategory()">
      </a>
      <div ng-if="$ctrl.data">
          <side-features ng-show="$ctrl.active"
             category="{{ $ctrl.data.id }}"
             features="$ctrl.data.features"
             active="$ctrl.activeItem">
          </side-features>
      </div>
  </div>
`;

const bindings = { categoryId: '@', data: '<', active: '<' };

class controller {

  constructor( sidemenuActions ) {
    this.actions = sidemenuActions;
    this.categoryId = parseInt( this.categoryId );
  }

  isActive() {
    return this.actions.category === this.categoryId ? styles.active : '';
  }

  onCategory() {
    if ( this.actions.category ) {
      if ( this.actions.category === this.categoryId ) {
        this.actions.category = null;
        return;
      }
    }
    this.actions.category = this.categoryId;
  }

  get activeItem() {
    return this.actions.item;
  }
}

export default angular
  
    .module('Side Category Module', [ 
      require('./side-features').default
    ])

    .component('sideCategory', { bindings, template, controller })
  
    .name;
