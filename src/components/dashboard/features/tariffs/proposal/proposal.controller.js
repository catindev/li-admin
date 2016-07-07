import styles from "common/utils/component.less";
import resetParams from "common/utils/reset-params";

class Controller {
  constructor( priceActions ) {
    this.styles = styles;
    this.actions = priceActions;
  }

  calc(revenue_ratio) {
    this.fetching = true;
    resetParams(this, ['error', 'price', 'partner']);
    this.actions.requestPrices({revenue_ratio})
      .success(() => {
        this.price = this.actions.price;
        this.fetching = false;
      })
      .error(error => {
        this.error = error.message;
        this.fetching = false;
      });
  }

}
export default Controller;
