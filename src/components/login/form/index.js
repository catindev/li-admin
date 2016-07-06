import appConfig from "common/utils/config";
import styles from "./form.less";
import "./form.css";

const bindings = { state: '<', onChange: '&', onSubmit: '&' };

const template = `
    <form name="LoginForm" class="Login-form ${ styles.form }" ng-submit="$ctrl.onSubmit()">
    
        <p class="${ styles.error }" ng-bind="$ctrl.state.error"></p>
    
        <input type="text" class="form-control Login-form__input"
               placeholder="Логин" name="login" autofocus=""
               ng-model-options="$ctrl.modelOpts"
               ng-model="$ctrl.state.login"
               ng-change="$ctrl.change()"/>
    
        <input type="password" class="form-control Login-form__input"
               placeholder="Пароль" name="password"
               ng-model-options="$ctrl.modelOpts"
               ng-model="$ctrl.state.password"
               ng-change="$ctrl.change()"/>
    
        <div class="checkbox">
            <label>
                <input type="checkbox" 
                       ng-model="$ctrl.state.temporary"
                       ng-change="$ctrl.change()">
                Запомнить меня
            </label>
        </div>
    
        <button class="btn btn-lg btn-primary btn-block"
                type="submit" ng-disabled="!($ctrl.state.login && $ctrl.state.password)">
            Войти
        </button>
    
        <p style="text-align:center; margin-top:2rem;">
            <a href="#" style="display: none; text-decoration: underline;">
                Не помню пароль
            </a>
        </p>
    </form>
`;

class controller {

    constructor () {
        this.styles = styles;
        this.modelOpts = appConfig.modelOptions;
    }

    $onChanges( changes ) {
        changes.state && ( this.state = Object.assign( {}, this.state ) );
    }

    change() {
        let $event = {
            login: this.state.login,
            password: this.state.password,
            temporary: this.state.temporary
        };
        this.onChange({ $event });
    }
}

export default angular

    .module( 'Login Form Module', [] )

    .component( 'loginForm', { bindings, template, controller })

    .name;
