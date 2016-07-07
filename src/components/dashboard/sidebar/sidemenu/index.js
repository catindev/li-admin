import styles from './sidemenu.less';
import actions from "./sidemenu.actions";

const template = `
  <ul class="${ styles.sidemenu }">
      <li ng-repeat="category in $ctrl.items track by $index">
          <side-category
              category-id="{{ category.id }}"
              data="category"
              active="$ctrl.isActive(category.id)">
          </side-category>
      </li>
  </ul>
`;

class controller {
  constructor ( sidemenuActions ) {
    this.actions = sidemenuActions;
  }

  isActive( id ) {
    return this.actions.isActive( 'category', id );
  }
}

export default angular

  .module('Sidemenu Module', [
    require('./side-category').default
  ])

  .service('sidemenuActions', actions)

  .component('sidemenu', { bindings: { items: '<' }, template, controller })

  .name;
