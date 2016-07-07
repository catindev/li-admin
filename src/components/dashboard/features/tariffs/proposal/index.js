import template from "./proposal.html";
import controller from "./proposal.controller";

import appConfig from "common/utils/config";
const resolve = appConfig.routerResolve;

export default angular
  
  .module('Tariffs Proposal Module', [
    , require('common/loader-layout').default
  ])
  
  .component('tariffsProposal', { template, controller })
  
  .config($routeProvider => $routeProvider.when(
    '/finance/tariff/proposal', {
      template: `
        <dashboard state="$resolve.state">   
            <tariffs-proposal></tariffs-proposal>
        </dashboard>
      `,
      resolve
    }
  ))
  
  .name;
