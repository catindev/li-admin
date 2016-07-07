import styles from './header.less';

const template = `
  <div class="row">
      <div class="col-lg-12">
          <h1 class="${ styles.title }" ng-bind="$ctrl.state.title"></h1>
          <h3 ng-if="$ctrl.state.subtitle" class="${ styles.subtitle }" ng-bind="$ctrl.state.subtitle"></h3>
          <ol ng-if="$ctrl.state.breadcrumbs" class="breadcrumb">
              <li>
                <a class="${ styles.link }" style="border: 0;" href="/home">
                    <span class="glyphicon glyphicon-home"></span>
                </a>
              </li>  
              <li ng-repeat="breadcrumb in $ctrl.state.breadcrumbs track by $index" 
                  ng-class="{ 'active': $last }">
                  <a ng-if="!$last" class="${ styles.link }" ng-href="{{ breadcrumb.url }}" ng-bind="breadcrumb.title"></a>
                  <span ng-if="$last" ng-bind="breadcrumb.title"></span>
              </li>
          </ol>
      </div>
  </div>
`;

export default angular
  
  .module('Dashboard Header Module', [])

  .component('dashboardHeader', { bindings: { state: '<' }, template })
  
  .name;
