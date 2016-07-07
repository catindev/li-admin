import styles from './price-list.less';

const template = `
  <div>
    <div ng-if="$ctrl.state.length === 0" class="${ styles.message }">
      Нет данных :(
    </div>
    <table class="table" ng-if="$ctrl.state.length > 0">
      <thead>
      <tr>
        <th>Страна</th>
        <th>Оператор</th>
        <th class="${ styles.right }">Стоимость в договоре</th>
        <th class="${ styles.right }">Закупка</th>
        <th class="${ styles.right }">Маржа SMS Online</th>
      </tr>
      </thead>
      <tbody>
      <tr ng-repeat="price in $ctrl.state track by $index">
        <td ng-bind="price.country"></td>
        <td ng-bind="price.operator"></td>
        <td ng-bind="price.pay" class="${ styles.right }"></td>
        <td ng-bind="price.netto" class="${ styles.right }"></td>
        <td ng-bind="price.revenue" class="${ styles.right }"></td>
      </tr>
      </tbody>
    </table>
  </div>
`;

const bindings = { state: '<' };

export default angular
  
  .module('Tariffs Price-list Module', [])
  
  .component('priceList', { bindings, template })
  
  .name;
