import angular from 'angular';
import directive from './directive';
import endOfScroll from 'common/end-of-scroll';

export default angular
  .module('input.dropdown.module', [endOfScroll])
  .directive('inputDropdown', directive)
  .name;
