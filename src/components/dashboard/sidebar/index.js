import styles from "./sidebar.less";

const template = `
    <div class="${ styles.wrapper }">
    
        <div class="${ styles.logo }">
            <a href="/home" class="${ styles.link }">
                <strong>SMS</strong>ONLINE
            </a>
        </div>
    
        <side-menu items="$ctrl.state"></side-menu>
    </div>
`;

export default angular

    .module( 'Sidebar Module', [])

    .component( 'sidebar', { bindings: { state: '<' }, template })

    .name;
