import jsCookies from "js-cookie";
import appState from "common/state";
import appConfig from "common/utils/config";
import formData from "common/utils/form-data";
import parseMenu from "common/menu-parser";
import fakeAccess from "common/utils/fake-access";

class CommonActions {

  constructor($http, $location, $q) {
    this.$http = $http;
    this.$location = $location;
    this.$q = $q;

    console.info('Common Actions Service constructed');
  }

  authorization() {
    let {login, password, temporary} = appState.select('loginForm').get();
    let expires = 1;

    // Здесь пара костылей потому, что бэкенд принимает:
    // 1. Параметр временной сессии, а не сохранения;
    if (!temporary) {
      temporary = true;
    } else {
      temporary = undefined;
      expires = 365;
    }

    // 2. Логин и пароль в теле запроса, но в querystring, а не в payload.
    let query = formData.fromJSON({login, password, temporary});

    return this.$http({method: 'POST', url: `${ appConfig.apiURL }/v1/login?${ query }`})
      .then(response => {
        let { access_token } = response.data;
        console.log(':D trying to set', access_token)
        jsCookies.set('sid', access_token, { expires });
        console.log(':D setting', jsCookies.set('sid', access_token, { expires }));
        appState.set('accessToken', access_token);
        appState.select('loginForm').unset();
        this.$location.path('/home');
        return { error: null }
      })
      .catch(error => ({error: error.data.message}));
  }

  authentication() {
    let accessToken = appState.select('accessToken').get();

    if (!accessToken) {
      accessToken = jsCookies.get('sid');

      if (accessToken) {
        appState.set('accessToken', accessToken);
        if ( this.$location.path() === '/'  ) return this.$location.path('/home');
      } else {
        console.warn('Access Token not found');
        if ( this.$location.path() !== '/'  ) return this.$location.path('/');
      }
    }

    return this.$q.all({
      user: this.fetchUser( accessToken ),
      menu: this.fetchMenu( accessToken )
    }).then(values => values);
  }

  logout() {
    let {accessToken} = appState.get();
    this.$http.delete(
      `${ appConfig.apiURL }/v1/logout?access_token=${ accessToken }`
    )
      .then(() => {
        jsCookies.remove('sid');
        this.$location.path('/');
        appState.unset();
      });
  }


  fetchUser( accessToken ) {
    if ( !accessToken ) return;
    let { user } = appState.get();
    if (user) return this.$q.when(user);

    return this.$http.get(
      `${ appConfig.apiURL }/v1/me`, { params: { access_token: accessToken } }
    ).then(response => {
      appState.set('user', response.data);
      return response.data;
    }).catch(error => console.error("Can't fetch user", error));
  }

  fetchMenu( accessToken ) {
    if ( !accessToken ) return;
    let { menu } = appState.get();
    if (menu) return this.$q.when(menu);

    return this.$http.get(
      `${ appConfig.apiURL }/v1/access`,
      { params: { access_token: accessToken } }
    )
      .then(response => {
        let accessInfo = response.data;
        // const menu = parseMenu( fakeAccess );
        const menu = parseMenu( accessInfo);
        appState.set('menu', menu);
        return menu;
      })
      .catch(error => console.error("Can't fetch menu", error));
  }
}

export default CommonActions;
