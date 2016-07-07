import template from "./template.html";
import styles from "./styles.less";

const bindings = { items: '<', onRemove: '&' };

class controller {
  constructor() {
    this.styles = styles;
  }
  
  $onChanges( changes ) {
    if ( changes.items.isFirstChange() ) return;
    if ( changes.items ) this.items = angular.copy( this.items );
  }

  removeItem( index ) {
    const $event = { index };
    this.onRemove( { $event } );
  }
}

export default { bindings, template, controller };
