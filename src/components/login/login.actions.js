import appState from "common/state";

const loginForm = appState.select( 'loginForm' );

class LoginActions {

    constructor( $http, $location, $q ) {
        this.$http = $http;
        this.$location = $location;
        this.$q = $q;
        console.info('Login Actions Service constructed');
    }

    get form() { return loginForm.get(); }

    set form( data ) { loginForm.set( data ); }

    error( message ) {
        message && loginForm.set( 'error', message );
    }
}

export default LoginActions;
