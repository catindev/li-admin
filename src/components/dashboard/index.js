import appConfig from "common/utils/config";
import styles from "./dashboard.less";
import actions from "./dashboard.actions";

const resolve = appConfig.routerResolve;

const template = `
<div class="${ styles.wrapper }">
    <div class="${ styles.sidebar }">
        <sidebar state="$ctrl.state.menu"></sidebar>
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
    const header =  this.actions.headerState;
    header.title === 'Главная' && ( header.title = 'Панель управления' );
    this.header = header;
  }

}

export default angular

  .module('Dashboard module', [
    require('./sidebar').default,
    require('./top-menu').default,
    require('./header').default
  ])

  .component('dashboard', {
    bindings: { state: '<' },
    transclude: true,
    template,
    controller
  })

  .service('dashboardActions', actions)

  .config($routeProvider => $routeProvider.when(
    '/home',
    {
      template: `
        <dashboard state="$resolve.state">
            <p>wo wo woooow!</p>    
            <home-menu></home-menu>
        </dashboard>
      `,
      resolve
    }
  ))

  .name;
