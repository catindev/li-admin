import appConfig from "common/utils/config";
import styles from "./dashboard.less";

const resolve = appConfig.routerResolve;

const template = `
<div class="${ styles.wrapper }">
    <div class="${ styles.sidebar }">
        <sidebar state="$ctrl.state.menu"></sidebar>
    </div>
    <div class="${ styles.content }">   
        <top-menu state="$ctrl.state.user"></top-menu>
      
        <div class="${ styles.row }">
           HEADER (title + breadcrumbs)
        </div>
       
        <div class="${ styles.row }">
           <ng-transclude></ng-transclude>
        </div>
    </div>
</div>
`;

export default angular

    .module( 'Dashboard module', [
        require( './sidebar' ).default,
        require( './top-menu' ).default
    ])

    .component( 'dashboard', {
        bindings: { state: '<' },
        transclude: true,
        template
    })

    .config( $routeProvider => $routeProvider.when(
        '/home', 
        {
            template: '<dashboard state="$resolve.state">Home page</dashboard>',
            resolve
        }
    ))

    .name;
