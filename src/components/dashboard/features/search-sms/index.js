import actions from "./search-sms.actions";
import component from "./search-sms.component";

import appConfig from "common/utils/config";
const resolve = appConfig.routerResolve;

export default angular
  
  .module( 'Search SMS Module', [
    , require('./report').default
    , require('./common/items-list').default
    , require('./keywords-input').default
    , require('./exclude-idp').default
    , require('./period').default
    , require('common/find-partner').default
  ])
  
  .component( 'searchSms', component )
  
  .service( 'SearchSMSActions', actions )

  .config($routeProvider => $routeProvider.when(
    '/search/sms',
    {
      template: `
          <dashboard state="$resolve.state">
              <search-sms></search-sms>
          </dashboard>
        `,
      resolve
    }
  ))
  .name
;
