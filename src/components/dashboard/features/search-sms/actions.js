import appState from "common/state";

import fakeResults from "./fake_results";

const form = appState.select([ 'forms', 'searchSMS' ]);

class SearchSMSActions {

  // TODO: move all appStates to global
  constructor( $http, $q, $timeout ) {
    this._http = $http;
    this._q = $q;
    this._timeout = $timeout;

    form.set({
      keywords: [],
      exclude: { IDPs: [], titles: [] },
      period: { start: null, end: null },
      searchResults: []
    });
  }

  get form() { return form.get(); }
  set form( appState ) { form.set( appState ); }

  // TODO: error handler
  searchSMS() {
    return this._timeout(() => {
      this.report = angular.copy( fakeResults );
      return this._q.when( true );
    }, 1200);
  }

  setAsFraud( items ) {
    return this._timeout(() => {
      this.report = items.filter(item => !item.selected);
      (this.report.length > 0) && (this.file = 'https://cloudup.com/files/i7ZGwvHhPIC/download');
      return this._q.when( true );
    }, 1000);
  }
}

export default SearchSMSActions;
