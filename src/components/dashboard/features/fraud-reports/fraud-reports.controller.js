import styles from "common/utils/component.less";
import months from "./months.js";
import appConfig from "common/utils/config";
import qsForm from "common/utils/qs-form";
import notCurrentURI from "common/utils/is-current-uri";

let intervalPromise;

class Controller {
  constructor( fraudActions, commonActions, $q, $interval, $timeout, $rootScope, $location ) {
    this.opts = appConfig.modelOptions;
    this._interval = $interval;
    this._timeout = $timeout;
    this._q = $q;
    this._rootScope = $rootScope;
    this.months = months;
    this.actions = fraudActions;
    this.commonActions = commonActions;
    this.styles = styles;

    this.$location = $location;
  }

  $onInit() {
    this.years = [ '2016', '2015', '2014', '2013', '2012' ];
    this.types = [
      { id: "all", title: "SMS и fraud" },
      { id: "sms", title: "Только SMS" },
      { id: "fraud", title: "Только fraud" },
    ];

    this._rootScope.$on(
      "$routeChangeStart",
      (event, next, current) => notCurrentURI(next, current) && (this.reports = null)
    );

    const isForm = this.readQueryForm();
    if ( isForm ) return;

    this._year = '2016';
    this.actions.form = { key: 'year', value: '2016' };
    this._type = "all";
    this.actions.form = { key: 'type', value: 'all' };
  }

  readQueryForm() {
    const qs = qsForm.read();
    if ( qs ) {
      this.actions.rewriteForm( qs );
      this.findFraud();

      const form = this.actions.form;
      this._year = form.year;
      this._type = form.type;
      this._phone = form.phone;
      this._byCost = form.by_cost === 'true';
      return true;
    }
    return false;
  }

  get form() { return this.actions.form; }

  setForm( data ) {
    this.actions.form = data;
  }

  selectPartner( partner ) {
    this.actions.form = { key: 'partner_id', value: partner.id };
  }

  onMonth( data ) {
    let id = data ? data.id : null;
    this.actions.form = { key: 'month', value: id };
  }
  
  createReport() {
    qsForm.write( this.actions.form );
  }
  
  findFraud() {
    this.reports = null;
    this.fetching = true;

    this._interval.cancel( intervalPromise );

    const fraudReportResponce = response => {
      this.reports = response.items || [];
      this.dropRequest();
    };

    intervalPromise = this._interval(
      () => {
        this.actions.fraudReport()
          .success( fraudReportResponce )
          .error(error => ( !error.request_id ) && this.dropRequest() );
      },
      2000
    );
  }

  dropRequest() {
    this.fetching = false;
    this._interval.cancel( intervalPromise );
    this.actions.dropRequest();
  }

  cancelRequest() {
    this.$location.search({});
    this.dropRequest();
    this.actions.dropRequest();
  }

  validate() {
    return !!this._phone && !!this.actions.form.month;
  }

  filterMonth(userInput) {
    const filter = this._q.defer();
    const normalisedInput = userInput.toLowerCase();

    const filteredArray = months.filter(month => {
      return month
        .title
        .toLowerCase()
        .indexOf( normalisedInput ) === 0;
    });

    filter.resolve(filteredArray);
    return filter.promise;
  };
}

export default Controller;
