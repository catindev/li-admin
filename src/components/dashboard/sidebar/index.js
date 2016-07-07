import styles from "./sidebar.less";
import actions from "./sidebar.actions";

const template = `
    <div class="${ styles.wrapper }">
    
        <div class="${ styles.logo }">
            <a href="/home" class="${ styles.link }">
                <strong>SMS</strong>ONLINE
            </a>
        </div>
    
        <sidemenu items="$ctrl.menu"></sidemenu>
    </div>
`;

class controller {

  constructor( sidebarActions ) {
    this.actions = sidebarActions;
  }

  $onInit() {
    this.actions.setState( this.menu );
  }

  get state() { return this.actions.state; }
}


export default angular

    .module( 'Sidebar Module', [
      require('./sidemenu').default
    ])

    .service('sidebarActions', actions)

    .component( 'sidebar', { bindings: { menu: '<' }, template, controller })

    .name;
