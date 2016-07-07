import actions from './keywords-actions.actions';

const template = `
  <div class="form-group">
      <label class="control-label col-sm-3">Ключевые слова</label>
      <div class="col-sm-6">
          <input type="text" class="form-control" ng-model="$ctrl._keyword" ng-keypress="$ctrl.addKeyword($event)">
          <items-list ng-if="$ctrl.keywords.length > 0"
              items="$ctrl.keywords"
              on-remove="$ctrl.removeKeyword($event)">
          </items-list>
      </div>
      <button class="btn btn-primary col-sm-1" ng-disabled="!$ctrl._keyword" ng-click="$ctrl.addKeyword()">
          <span class="glyphicon glyphicon-plus"></span>
      </button>
  </div>
`;

class controller {
  
  constructor( searchSMSKeywordsActions ) {
    this.actions = searchSMSKeywordsActions;
  }
  
  $onInit() {
    this.actions.loadFromBrowser();
  }
  
  get keywords() {
    return this.actions.items;
  }
  
  removeKeyword( { index } ) {
    this.actions.removeKeyword( index );
  }
  
  addKeyword( event ) {
    if ( event ) {
      const keyCode = event.which || event.keyCode;
      if ( keyCode !== 13 ) return;
    }
    this.actions.addKeyword( this._keyword );
    this._keyword = '';
  }
}

export default angular
  .module('SS.keywords-input', [])
  .component('ssKeywordsInput', { template, controller })
  .service('searchSMSKeywordsActions', actions)
  .name;
