import appState from "common/state";
import styles from './other-page.less';

import appConfig from "common/utils/config";
const resolve = appConfig.routerResolve;

const template = `
  <div>
      <div ng-if="$ctrl.items" class="${ styles.component }">
        <div class="${ styles.item }" ng-repeat="item in $ctrl.items track by $index">
          <a class="${ styles.link }" ng-href="{{ item.url || item.uri }}">
              <span class="${ styles.icon } glyphicon glyphicon-{{ $ctrl.getIcon($index) }}">
              </span>
              {{ item.title }}
          </a>
        </div>
      </div>
      <div ng-if="!$ctrl.items" class="${ styles.notFound }">
        <p>Такой страницы у нас нет. Выберите нужный раздел в меню слева или <a href="/home">на главной</a> странице</p>
        <p></p> 
      </div>
  </div>
`;

class controller {

  get items() {
    return appState.select('submenu').get();
  }
  
  getIcon( index ) {
    const item = this.items[ index ];
    return 'features' in item ? 'folder-open' : 'cog';
  }

}

export default angular
  
  .module('Submenu Module', [])
  
  .component('otherPage', { template, controller })

  .config($routeProvider => $routeProvider.otherwise({
    template: `
        <dashboard state="$resolve.state">
            <other-page></other-page>
        </dashboard>
      `,
    resolve
  }))

  .name;
