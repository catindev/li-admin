import appState from "common/state";
import appConfig from "common/utils/config";
import formData from "common/utils/form-data";
let form = appState.select([ 'forms', 'partners_fraud' ]);

class FraudActions {
  constructor($http, $q) {
    this._http = $http;
    this._timeout = $q.defer();
  }

  get form() {
    return form.get();
  }

  set form(data) {
    form.set(data.key, data.value);
  }

  rewriteForm(data) {
    form.set(data);
  }

  fraudReport() {
    let _form = form.get() || {},
      access_token = appState.select('accessToken').get();

    let { partner_id, type, by_cost, phone, request_id } = _form;
    let phones = formData.fromArray('phone', phone.split(/\r?\n/)),
      query = formData.fromJSON(
        Object.assign(
          {},
          {partner_id, type, by_cost, request_id},
          {date: `${_form.month}.${_form.year}`}
        )
      );

    const fraudError = data => {
      if (!data) return data;
      if (data.status === 0) console.info('fraud request cancelled');
      if ('request_id' in data) {
        form.set('request_id', data.request_id);
      } else {
        console.error('fraud request error', data);
      }
      return data;
    };

    return this._http({
      method: 'POST',
      url: `${ appConfig.apiURL }/v1/partners/fraud?access_token=${ access_token }`,
      data: `${ query }&${ phones }`,
      headers: formData.сontentType
    })
      .success(response => response)
      .error( fraudError );
  }

  dropRequest() {
    this._timeout.resolve();
    form.unset('request_id');
  }
}

export default FraudActions;
