import appState from "common/state";

const form = appState.select([ 'forms', 'searchSMS', 'keywords' ]);
form.set([]);

class SearchSMSKeywordsActions {

  loadFromBrowser() {
    const storedKeywords = localStorage.getItem( 'keywordsList' );

    const keywords = storedKeywords
      ? JSON.parse( storedKeywords )
      : [];

    (keywords.length > 0) && form.set(keywords);
  }

  saveToBrowser( data ) {
    localStorage.removeItem( 'keywordsList' );
    localStorage.setItem(
      'keywordsList', JSON.stringify( data || form.get() )
    );
  }

  addKeyword( keyword ) {
    form.push( keyword );
    this.saveToBrowser();
  }

  removeKeyword( index ) {
    form.splice([ index, 1 ]);
    this.saveToBrowser();
  }

  get items() { return form.get(); }
}

export default SearchSMSKeywordsActions;
