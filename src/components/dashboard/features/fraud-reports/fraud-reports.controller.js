import styles from "common/utils/component.less";
import months from "./months.js";
import appConfig from "common/utils/config";
import qsForm from "common/utils/qs-form";


let intervalPromise;

class Controller {
  constructor( fraudActions, commonActions, $q, $interval, $timeout, $rootScope ) {
    this.opts = appConfig.modelOptions;
    this._interval = $interval;
    this._timeout = $timeout;
    this._q = $q;
    this._rootScope = $rootScope;
    this.months = months;
    this.actions = fraudActions;
    this.commonActions = commonActions;
    this.styles = styles;
  }

  $onInit() {
    this.years = [ '2016', '2015', '2014', '2013', '2012' ];
    this._year = '2016';
    this.actions.form = { key: 'year', value: '2016' };

    this.types = [
      { id: "all", title: "SMS и fraud" },
      { id: "sms", title: "Только SMS" },
      { id: "frod", title: "Только fraud" },
    ];
    this._type = "all";
    this.actions.form = { key: 'type', value: 'all' };


    this.readQueryForm();

    this._rootScope.$on(
      "$routeChangeStart",
      (event, next, current) => notEqualPaths(next, current) && (this.reports = null)
    );
  }


  setForm( data ) {
    if (data.key === 'phone') data.value = data.value.split(/\r?\n/);
    this.actions.form = data;
  }

  // Deprecated
  onPartner( data ) {
    let id = data.item ? data.item.id : null;
    this.actions.form = { key: 'partner_id', value: id };
  }
  
  selectPartner( partner ) {
    this.actions.form = { key: 'partner_id', value: partner.id };
  }

  onMonth( data ) {
    let id = data ? data.id : null;
    this.actions.form = { key: 'month', value: id };
  }
  
  readQueryForm() {
    const qs = qsForm.read();
    if ( qs ) {
      this.actions.rewriteForm( qs );
      this.findFraud();
    }
  }
  
  createReport() {
    qsForm.write( this.actions.form );

    this.reports = null;
    this.fetching = true;

    intervalPromise = this._interval(
      () => {
        this.actions.fraudReport()
          .success(response => {
              this.reports = response.items || [];
              this.dropRequest();
          })
          .error(error => {
              if ( !error.request_id ) this.dropRequest();
          });
      },
      2000
    );
  }
  
  findFraud() {
    this.reports = null;
    this.fetching = true;

    intervalPromise = this._interval(
      () => {
        this.actions.fraudReport()
          .success(response => {
            this.reports = response.items || [];
            this.dropRequest();
          })
          .error(error => {
            ( !error.request_id ) && this.dropRequest();
          });
      },
      2000
    );
  }

  dropRequest() {
    this.fetching = false;
    this._interval.cancel( intervalPromise );
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
