import template from "./template.html";
import styles from "common/component.less";
import qsForm from "common/utils/qs-form";

const notEqualPaths = (next, current) => next.$$route.originalPath !== current.$$route.originalPath;

class controller {
  
  constructor( commonActions, $timeout, $location, SearchSMSActions, $rootScope ) {
    this._rootScope = $rootScope;
    this._timeout = $timeout;
    this._location = $location;
    this.styles = styles;
    this.actions = SearchSMSActions;
    this.commonActions = commonActions;
  }
  
  $onInit() {

    this.reported = false;
    this.fetching = false;

    this.readQueryForm();

    this._rootScope.$on(
      "$routeChangeStart",
      (event, next, current) => notEqualPaths(next, current) && this.reset()
    );
  }

  get form() { return this.actions.form; }

  get report() { return this.actions.report; }

  get file() { return this.actions.file; }

  isValidForm() {
    return this.actions.form.keywords.length > 0;
  }

  readQueryForm() {
    const qs = qsForm.read();
    if ( qs ) {
      // TODO: fetching state to global state
      this.fetching = true;
      this.actions.form = qs;

      this.actions.searchSMS()
        .then(result => this.fetching = false);
    }
  }

  requestReport() {
    qsForm.write( this.actions.form );
  }
  
  setAsFraud({ items }) {
    this.fetching = true;

    this.actions.setAsFraud( items )
      .then(result => {
        (this.report.length === 0) && this.reset();
        this.fetching = false;
      });
  }
  
  reset() {
    this._location.search({});
    this.actions.report = null;
    this.actions.file = null;
  }

  download() {
    document.location.href = this.file;
  }
}

export default { template, controller };
