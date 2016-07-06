  import appState from "common/state";
  import { find } from "lodash";

  const pathToArray = path => ( path.split('/') ).splice( 1, 1 );

  const createBreadcrumbs = ( path, config ) => {
    let breadcrumbs = [];
    path.forEach( id => {
      const { title, url, uri } = find( config, { id });
      breadcrumbs.push({ title, url, uri });
    });
    return breadcrumbs;
  }

  class DashboardActions {

    constructor( $location ) {
      this.path = pathToArray( $location.path() );

      console.info('Dashboard Actions Service constructed');
    }

    get headerState() {
      const menu = appState.select( 'menu' ).get();
      let breadcrumbs, { title } = find( menu, { id: this.path[ this.path.length - 1 ] });

      const path = this.path.splice( this.path.length, 1 );
      path.length > 0 && ( breadcrumbs = createBreadcrumbs( this.path, menu ) );

      const state = { title, breadcrumbs };

      return state;
    }

    getSidebarState() {


    }
  }

  export default DashboardActions;
