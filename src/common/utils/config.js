const apiURL = 'https://mixplat-api.sms-online.com';

const modelOptions = { debounce: { 'default': 250, 'blur': 0 } };

const routerResolve = { state: commonActions => commonActions.authentication() };

export default { apiURL,  modelOptions, routerResolve };
