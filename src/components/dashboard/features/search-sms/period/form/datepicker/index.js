import "common/utils/ng-datepicker";
import "common/utils/ng-datepicker/styles.css";


const bindings = { label: '@', date: '<', type: '@', error: '<', onChange: '&' };

const template = `
  <div class="form-group" ng-class="{ 'has-error': $ctrl.error }">
      <label class="control-label col-sm-3" ng-bind="$ctrl.label"></label>
      <div class="col-xs-4">
          <datepicker date-format="dd.MM.yyyy" position="bottom">
              <input class="form-control" ng-model="$ctrl.date" ng-change="$ctrl.change()" ng-blur="$ctrl.blur()"/>
          </datepicker>
          <span class="sr-only">(error)</span>
          <span ng-if="$ctrl.error" class="help-block" ng-bind="$ctrl.error"></span>
      </div>
  </div>
`;

class controller {

  $onChanges( changes ) {
    changes.date && (this.date = angular.copy( this.date ));
  }

  change() {
    const $event = { type: this.type, date: this.date }
    this.onChange({ $event });
  }

  blur() {
    this.error && (this.date = '');
  }
}

export default angular
  .module('SS.period-datepicker', [ '720kb.datepicker' ])
  .component('ssDatepicker', { bindings, template, controller })
  .name;
