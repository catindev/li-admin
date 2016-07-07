import appState from "common/state";
import { find } from "lodash";
import pathToArray from "common/utils/path-to-array";

class DashboardActions {

  constructor( $location ) {
    this.$location = $location;

    console.info('Dashboard Actions Service constructed');
  }

  setPageState( menu ) {
    if ( this.$location.path() === '/home' ) {
      appState.set('header', { status: 'OK', title: 'Панель управления' });
      return;
    }

    const path = pathToArray( this.$location.path() );
    if ( path.length > 3 ) {
      appState.set('header', { status: 404, title: 'Страница не найдена' });
      return;
    }

    let submenu, breadcrumbs = [], status = 'OK', title;

    const category = find( menu, { id: path[0] });
    if ( category ) {
      submenu = category.features;
      breadcrumbs.push({ title: category.title, url: category.id });
      title = category.title;

      if ( path.length >= 2 ) {
        const item = find( category.features, { id: path[1] });
        if ( item ) {
          submenu = item.features;
          breadcrumbs.push({ title: item.title, url: `${ category.id }/${ item.id }` });
          title = item.title;

          if ( path.length >= 3 ) {
            const subitem = find( item.features, { id: path[2] });

            if ( subitem ) {
              submenu = null;
              breadcrumbs.push({ title: subitem.title });
              title = subitem.title;
            } else status = 404;
          }
        } else status = 404;
      }
    } else status = 404;

    if ( status === 404 ) {
      breadcrumbs = false;
      submenu = null;
      title = 'Страница не найдена';
    }

    appState.set('header', { status, title, breadcrumbs  });
    appState.set('submenu', submenu);
  }

  get headerState() {
    return appState.select( 'header' ).get();
  }
}

export default DashboardActions;
