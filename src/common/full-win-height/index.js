import angular from 'angular';
import directive from './full-win-height.directive';

export default angular
  .module('Full Window Height Module', [])
  .directive('fullWindowHeight', directive)
  .name;
