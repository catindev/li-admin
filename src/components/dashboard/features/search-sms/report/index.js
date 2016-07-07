import template from "./template.html";
import styles from "./styles.less";

const bindings = { data: '<', onReset: '&', onUpdate: '&' };

class controller {

  constructor( $timeout ) {
    this._timeout = $timeout;
    this.styles = styles;
  }

  $onChanges( changes ) {
    changes.data && ( this.data = angular.copy(this.data) );
  }
  
  selectAll() {
    this.data = this.data.map( item => {
      item.selected = this._selectAll;
      return item;
    });
  }

  select( $index ) {
    if ( this.reported ) return;
    this.data[ $index ].selected = !this.data[ $index ].selected;
  }
  
  get selected() {
    if ( !this.data ) return;
    return this.data.filter( item => item.selected );
  }

  get notSelected() {
    return this.selected.length === 0;
  }

  isSelected( index ) {
    const item = this.data[ index ];
    if ( 'selected' in item && item.selected ) return this.styles.selected;
    return '';
  }

  callAction() {
    this._selectAll = false;
    let $event = { items: this.data };
    this.onUpdate( { $event } );
    this.reported = true;
  }
}

export default angular
  .module('SS.report', [])
  .component('ssReport', { bindings, template, controller })
  .name;
