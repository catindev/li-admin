import template from "./price.html";
import controller from "./price.controller";

import appConfig from "common/utils/config";
const resolve = appConfig.routerResolve;

export default angular

  .module('Tariffs Price Module', [
    , require('common/find-partner').default
    , require('common/loader-layout').default
  ])
  
  .component('tariffsPrice', { template, controller })
  
  .config( $routeProvider => $routeProvider.when(
    '/finance/tariff/price', {
    template: `
      <dashboard state="$resolve.state">   
          <tariffs-price></tariffs-price>
      </dashboard>
    `,
     resolve
    }
  ))
  
  .name;
