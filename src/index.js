import "bootstrap/dist/css/bootstrap.css";
import "common/common.css";

angular.module( 'smsonline', [
    require( 'angular-route' ),
    require( 'components/login' ).default,
    require( 'components/dashboard' ).default,
])
    .config( $locationProvider => $locationProvider.html5Mode( true ) )
    
    .service( 'commonActions', require("common/actions").default );

document.addEventListener(
    'DOMContentLoaded',
    () => angular.bootstrap( document, [ 'smsonline' ] )
);
