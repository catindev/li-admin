import template from './report.html';
import styles from './report.less';

const bindings = { data: '<' };

class controller {
  constructor() {
    this.styles = styles;
  }
}

export default angular

  .module('Fraud Report Module', [])

  .component('fraudReport', { bindings, template, controller })
  
  .name;
