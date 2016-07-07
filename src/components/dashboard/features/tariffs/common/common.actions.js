import appState from "common/state";
import appConfig from "common/utils/config";

// TODO: all state actions split to specific services
const formPrice = appState.select(['forms', `tariffPrice`]);
const formProposal = appState.select(['forms', `tariffProposal`]);

class PriceActions {
  constructor($http, $q, $window) {
    this.$http = $http;
    this.$timeout = $q.defer();
    this.$window = $window;

    formPrice.set( 'idp', null );
  }

  init() {
    this.partner = null;
    this.files = null;
    this.price = null;
  }

  get formPrice() { return formPrice.get(); }
  set formPrice( data ) { formPrice.set( data ); }

  get partnerInfo() {
    return this.partner;
  }

  requestPrices(query) {
    this.files = null;
    this.price = null;
    this.partner = null;

    let { accessToken } = appState.get();
    
    let {
      partner_id = null,
      revenue_ratio
    } = query;

    let url = `${ appConfig.apiURL }/v1/bulk/tariff?access_token=${ accessToken }`;
    
    url = revenue_ratio ?
      `${ url }&revenue_ratio=${ revenue_ratio }`  :
      `${ url }&partner_id=${ partner_id }`;

    return this.$http({ method: 'GET',  url })
      .success(
        ({ tariffs = [], partner = null, file_internal, file_partner }) => {
          this.init();

          this.files = {
            internal: file_internal,
            partner: file_partner
          };
          this.partner = partner;
          this.price = tariffs;
        }
      );
  }

  download(type) {
    this.$window.location.href = this.files[type];
  }
}

export default PriceActions;
