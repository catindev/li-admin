import actions from './actions';

const template = `
  <div class="form-group">
      <label class="control-label col-sm-3">Игнорировать партнёров</label>
      <div class="col-sm-6">
          <find-partner on-select="$ctrl.addIDP(partner)"></find-partner>
          <items-list ng-if="$ctrl.excludeList.length > 0"
                      items="$ctrl.excludeList"
                      on-remove="$ctrl.removeIDP($event)">
          </items-list>
      </div>
  </div>
`;

class controller {
  
  constructor( ExcludeIDPActions ) {
    this.actions = ExcludeIDPActions;
  }
  
  $onInit() {
    this.actions.loadFromBrowser();
  }
  
  get excludeList() {
    return this.actions.excludeList;
  }
  
  removeIDP( { index } ) {
    this.actions.removeIDP( index );
  }
  
  addIDP(partner) {
    this.actions.addIDP( partner );
  }
  
  get excludeList() {
    return this.actions.items;
  }
  
}

export default angular
  .module('searchSMS.excludeIDP.Module', [])
  .component('ssExcludeIdp', { template, controller })
  .service('ExcludeIDPActions', actions)
  .name;
