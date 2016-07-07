const bindings = { state: '<' };

const template = `
  <fieldset>
      <legend>Настройки поиска</legend>    
      <div class="form-group">
          <label class="control-label col-sm-4">Ключевые слова</label>
          <div class="col-xs-6">
              <div class="form-control disabled">
                <span ng-repeat="keyword in $ctrl.state.keywords track by $index">
                    <span ng-if="!$last">{{ keyword }}, </span>
                    <span ng-if="$last" ng-bind="keyword"></span>
                </span>
              </div>
          </div>
      </div>
  
      <div class="form-group">
          <label class="control-label col-sm-4">Игнорировать партнёров</label>
          <div class="col-xs-6">
              <div class="form-control">
                <span ng-repeat="partner in $ctrl.state.exclude.titles track by $index">
                    <span ng-if="!$last">{{ partner }}, </span>
                    <span ng-if="$last" ng-bind="partner"></span>
                </span>
              </div>
          </div>
      </div>
  
      <div class="form-group">
          <label class="control-label col-sm-4">Период</label>
          <div class="col-xs-6">
              <div class="form-control">
                c <span ng-bind="$ctrl.state.period.selected.start"></span>
                по <span ng-bind="$ctrl.state.period.selected.end"></span>
              </div>
          </div>
      </div>
  </fieldset>
`;

export default angular
  .module('SS.disabled-form', [])
  .component('ssDisabledForm', { bindings, template })
  .name;
