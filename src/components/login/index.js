import appConfig from "common/utils/config";
import actions from "./login.actions";
import styles from "./login.less";

const resolve = appConfig.routerResolve;

const template = `
    <div class="${ styles.wrapper }">
        <div class="${ styles.overlay }">
            <login-form 
                    state="$ctrl.form" 
                    on-change="$ctrl.changeForm($event)"
                    on-submit="$ctrl.submit()">
            </login-form>
        </div>
    </div>
`;

class controller {

    constructor( loginActions, commonActions ) {
        this.actions = loginActions;
        this.commonActions = commonActions;
        this.styles = styles;
    }

    get form() { return this.actions.form; }

    changeForm( changes ) {
        this.actions.form = changes;
    }

    submit() {
        this.commonActions.authorization( this.actions.form )
            .then( ({ error = null }) => error && this.actions.error(error) );
    }
}

export default angular

    .module( 'Login Module', [
        require( './form' ).default
    ])

    .service( 'loginActions', actions )

    .component( 'loginPage', { bindings: { state: '<' }, template, controller })

    .config( $routeProvider => $routeProvider.when(
        '/', { template: '<login-page></login-page>', resolve }
    ))

    .name;
