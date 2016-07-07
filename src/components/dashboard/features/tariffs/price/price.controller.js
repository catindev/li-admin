import styles from "common/utils/component.less";
import appConfig from "common/utils/config";
import resetParams from "common/utils/reset-params";
import qsForm from "common/utils/qs-form";

const notEqualPaths = (next, current) => next.$$route.originalPath !== current.$$route.originalPath;

class Controller {
  constructor(priceActions, commonActions, $q, $interval, $timeout, $window, $rootScope, $location) {
    this.opts = appConfig.modelOptions;
    this._interval = $interval;
    this._timeout = $timeout;
    this._window = $window;
    this._q = $q;
    this._rootScope = $rootScope;
    this._location = $location;

    this.styles = styles;
    this.actions = priceActions;
  }

  $onInit() {
    this.readQueryForm();

    this._rootScope.$on(
      "$routeChangeStart",
      (event, next, current) => notEqualPaths(next, current) && resetParams(this, ['error', 'price', 'partner'])
    );
  }
  
  readQueryForm() {
    const qs = qsForm.read();
    if ( qs ) {
      this.actions.formPrice = qs;
      this.requestPrices();
    }
  }
  
  
  getPrice() {
    this.reset();
    qsForm.write( this.actions.formPrice );
  }
  
  requestPrices() {
    resetParams(this, ['error', 'price', 'partner']);

    this.fetching = true;
    const idp = this.actions.formPrice.idp;

    this.actions.requestPrices({ partner_id: idp })
      .success(() => {
        this.price = this.actions.price;
        this.partner = this.actions.partner;
        this.fetching = false;
      })
      .error(error => {
        this.error = error.message;
        this.fetching = false;
      }); 
  }

  reset() {
    resetParams(this, ['error', 'price', 'partner']);
    this._location.search({});
  }

  onPartner( partner ) {
    let id = partner ? partner.id : null;
    this.actions.formPrice = { idp: id };
  }

  get idp() { return this.actions.formPrice.idp; }

}

export default Controller;
