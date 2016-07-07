import appConfig from "common/utils/config";
import styles from "./dashboard.less";

const resolve = appConfig.routerResolve;

const template = `
<div class="${ styles.wrapper }">
    <div class="${ styles.sidebar }">
        <sidebar menu="$ctrl.state.menu"></sidebar>
    </div>
    <div class="${ styles.content }">   
        <top-menu state="$ctrl.state.user"></top-menu>
      
        <div class="${ styles.row, styles.padding }">
           <dashboard-header menu="$ctrl.state.menu"></dashboard-header>
        </div>
       
        <div class="${ styles.row }">
           <ng-transclude></ng-transclude>
        </div>
    </div>
</div>
`;

export default angular

  .module('Dashboard module', [
    require('./sidebar').default,
    require('./top-menu').default,
    require('./header').default,
    require('./main-menu').default
  ])

  .component('dashboard', {
    bindings: { state: '<' },
    transclude: true,
    template
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

  .config($routeProvider => $routeProvider.otherwise({
    template: `
        <dashboard state="$resolve.state"></dashboard>
      `,
    resolve
  }))

  .name;
