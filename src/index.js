import "bootstrap/dist/css/bootstrap.css";
import "common/utils/common.css";

angular.module('li interface', [
  require('angular-route'),
  require('components/login').default,
  require('components/dashboard').default,
])
  .config($locationProvider => $locationProvider.html5Mode(true))
  .service('commonActions', require("common/actions").default);

document.addEventListener(
  'DOMContentLoaded',
  () => angular.bootstrap(document, [ 'li interface' ])
);
