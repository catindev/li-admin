import actions from './period.actions';
import periodForm from "./form";

const template = `
  <div>
      <div class="form-group">
          <label class="col-xs-3 control-label">Период</label>
          <div class="col-xs-9">
              <div class="radio" ng-repeat="item in $ctrl.types track by $index">
                  <label>
                      <input type="radio" name="periodType" 
                             ng-checked="$ctrl._type === item.id"
                             ng-click="$ctrl._type = item.id">
                      <span ng-bind="item.title"></span>
                  </label>
              </div>
          </div>
      </div>
  
      <div ng-if="$ctrl._type === 'custom'">
          <ss-period-form start="$ctrl._periodStart" end="$ctrl._periodEnd"
                          on-change="$ctrl.changePeriod($event)">
          </ss-period-form>
      </div>
  </div>
`;

class controller {
  
  constructor( searchSMSPeriodActions ) {
    this.actions = searchSMSPeriodActions;
  }
  
  $onInit() {
    this.actions.setDefaults();
    this._type = this.actions.type || "last_week";
  }
  
  get types() {
    return this.actions.types;
  }
  
  get _type() { return this.actions.type; }
  set _type( type ) { return this.actions.type = type; }
  
  get _periodStart() { return this.actions.getPeriod( 'start' ); }
  set _periodStart( date ) { this.actions.setPeriod( 'start', date ); }
  
  get _periodEnd() { return this.actions.getPeriod( 'end' ); }
  set _periodEnd( date ) { this.actions.setPeriod( 'end', date ); }
  
  changePeriod({ type, date }) {
    (type === 'end') && (this._periodEnd = date);
    (type === 'start') && (this._periodStart = date);
  }
  
}

export default angular
  .module('SS.period', [ periodForm ])
  .service('searchSMSPeriodActions', actions)
  .component('ssPeriod', { template, controller })
  .name;
