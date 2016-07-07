import link from './link';
import template from './template.html';
import controller from './controller';


const directive = {
  restrict: 'E',
  require: 'findPartner',
  scope: {
    onSelect: '&'
  },
  template,
  controller,
  link,
};

export default () => directive;
