import appState from "common/state";

const form = appState.select([ 'forms', 'searchSMS', 'exclude' ]);

class ExcludeIDPActions {

  loadFromBrowser() {
    const fromStorage = localStorage.getItem( 'excludeList' );
    fromStorage && form.set( JSON.parse( fromStorage ) );
  }

  saveToBrowser() {
    localStorage.removeItem( 'excludeList' );
    localStorage.setItem( 'excludeList', JSON.stringify( form.get() ) );
  }

  addIDP({ id, title }) {
    form.push( 'IDPs', id );
    form.push( 'titles', title );
    this.saveToBrowser();
  }

  removeIDP( index ) {
    form.splice( 'IDPs', [ index, 1 ] );
    form.splice( 'titles', [ index, 1 ] );
    this.saveToBrowser();
  }

  get items() {
    return form.get().titles;
  }
}

export default ExcludeIDPActions;
