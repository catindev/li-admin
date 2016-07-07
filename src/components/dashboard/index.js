import appConfig from "common/utils/config";
import actions from "./dashboard.actions";
import styles from "./dashboard.less";

const resolve = appConfig.routerResolve;

const template = `
<div class="${ styles.wrapper }" full-window-heigh>
    <div class="${ styles.sidebar }">
        <sidebar menu="$ctrl.state.menu"></sidebar>
    </div>
    <div class="${ styles.content }">   
        <top-menu state="$ctrl.state.user"></top-menu>
      
        <div class="${ styles.row, styles.padding }">
           <dashboard-header state="$ctrl.header"></dashboard-header>
        </div>
       
        <div class="${ styles.row }">
           <ng-transclude></ng-transclude>
        </div>
    </div>
</div>
`;


class controller {

  constructor( dashboardActions ) {
    this.actions = dashboardActions;
  }

  $onInit() {
    this.actions.setPageState( this.state.menu );
  }

  get header() { return this.actions.headerState; }
}


export default angular

  .module('Dashboard module', [
    require('./sidebar').default,
    require('./top-menu').default,
    require('./header').default,
    require('./main-menu').default,
    require('./other-page').default,
    require('common/loader-layout').default,
    require('common/full-win-height').default,

    // Features
    require('./features/search-sms').default,
    require('./features/fraud-reports').default,
  ])

  .service('dashboardActions', actions)
  
  .component('dashboard', {
    bindings: { state: '<' },
    transclude: true,
    template,
    controller
  })

  .config($routeProvider => $routeProvider.when(
    '/home',
    {
      template: `
        <dashboard state="$resolve.state">   
            <main-menu state="$resolve.state.menu"></main-menu>
        </dashboard>
      `,
      resolve
    }
  ))

  .name;
