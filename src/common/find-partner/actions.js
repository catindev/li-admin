import appState from "common/state";
import appConfig from "common/utils/config";

let form;

class FindPartnerActions {

  constructor($http, $q) {
    this._http = $http;
    this._q = $q;
    this.limit = 10;

    let rand = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    this.fid = `findPartner${new Date().getTime()}${rand}`;

    form = appState.select(['forms', this.fid]);
    form.set({
      first: null,
      fetching: false,
      selected: null,
      items: [],
      offset: this.limit,
      has_more: true
    });

    this.init();
    console.log(':D <find-partner/>', this.fid, 'created');
  }

  get items() {
    return form.get().items;
  }

  fetch(data) {
    let {query = null, scroll = false} = data;
    if (!query && !form.get().has_more) return;
    let items = form.get().items;
    let offset = form.get().offset || 0;

    this._http.get(
      `${ appConfig.apiURL }/v1/partners`,
      {
        params: {
          access_token: appState.select('accessToken').get(),
          limit: 6,
          offset,
          search_query: query,
        }
      }
    )
      .then(response => {
        if (!query) items = items.concat(response.data.items)
        else items = response.data.items;

        form.set('items', items);

        (scroll) ? offset = offset + this.limit : null;
        form.merge({
          has_more: response.data.has_more,
          offset,
          fetching: false
        });
      })
      .catch(error => console.console.log('fetch error', error));
  }

  init() {
    this._http.get(
      `${ appConfig.apiURL }/v1/partners`,
      {
        params: {
          access_token: appState.select('accessToken').get(),
          limit: 6,
          offset: 0
        }
      }
    )
      .then(response => {
        form.set('first', response.data.items);
        form.set('items', response.data.items);
      })
      .catch(error => console.log('first items error', error));
  }

  change(value) {
    if (value) {
      form.set('offset', 0);
      this.fetch({query: value});
    } else form.set('items', form.get().first);
  }

  selectItem(selected) {
    let {first} = form.get();
    form.merge({
      selected,
      has_more: true,
      offset: this.limit,
      items: first
    });
  }

}

export default FindPartnerActions;
