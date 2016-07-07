import actions from './common.actions';

export default angular
  
  .module('sms.common', [ 
    require('./price-list').default
  ])
  
  .service('priceActions', actions)
  
  .name;
