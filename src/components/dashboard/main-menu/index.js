import styles from "./main-menu.less";

const template = `
<div style="padding: 2rem 0;">
  <div class="${ styles.category }" ng-repeat="category in $ctrl.state track by $index" 
       ng-if="category.id !== 'home'">
		<div class="${ styles.title }">
			<h4 class="${ styles.header }">
				{{ category.title }}
			</h4>
		</div>

		<div class="${ styles.items }">
				<div ng-repeat="fn in category.features track by $index" class="${ styles.item }">
						<a ng-if="fn.url"
							ng-href="{{ fn.url }}"
							class="${ styles.link }"
							target="_blank"
							ng-bind="fn.title">
						</a>
						
						<a ng-if="fn.uri"
							ng-href="{{ fn.uri }}"
							class="${ styles.link }">
							{{ fn.title }} <sup>new</sup>
						</a>
						
				</div>
		</div>
</div>
`;

export default angular
  
  .module('D Main Menu Module', [])
  
  .component( 'mainMenu', { bindings: { state: '<' }, template })
  
  .name;
