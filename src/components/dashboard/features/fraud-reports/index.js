import actions from "./fraud-reports.actions";
import template from "./fraud-reports.html";
import controller from "./fraud-reports.controller";

const resolve = appConfig.routerResolve;
import appConfig from "common/utils/config";

export default angular

  .module('Fraud Reports Module', [
    , require('common/input-dropdown').default
    , require('common/loader-layout').default
    , require('common/find-partner').default
    , require('./report').default
  ])

  .component('fraudReports', { template, controller })

  .service('fraudActions', actions)

  .config($routeProvider => $routeProvider.when(
    '/stats/fraud', {
      template: `
        <dashboard state="$resolve.state">   
            <fraud-reports></fraud-reports>
        </dashboard>
      `,
      resolve
    }
  ))

  .name;
