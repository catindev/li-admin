import appState from "common/state";
import pathToArray from "common/utils/path-to-array";

class SidebarActions {

  constructor( $location ) {
    this.$location = $location;

    console.info('Sidebar Actions Service constructed');
  }

  setState() {
    const path = pathToArray( this.$location.path() );
    let state = { category: path[0] };
    path.length >= 2 && ( state.item = path[1] );
    path.length >= 3 && ( state.subitem = path[2] );
    appState.set('sidemenu', state);
  }

  get state() {
    return appState.select( 'sidemenu' ).get();
  }
}

export default SidebarActions;
