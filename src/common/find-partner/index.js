import directive from "./directive";
import actions from "./actions";

export default angular
  
  .module('Find Partner Module', [
    require('common/end-of-scroll').default
  ])
  
  .directive('findPartner', directive)
  
  .service('findPartnerActions', actions)
  
  .name;
