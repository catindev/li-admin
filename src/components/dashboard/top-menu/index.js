import "./top-menu.css";

const template = `
    <nav class="navbar navbar-default navbar-fixed-top">
            <ul class="nav navbar-nav navbar-right">
                    <li><a href="https://wiki.aqq.me" target="_blank">Wiki</a></li>
                    <li><a href="https://qq.aqq.me/" target="_blank">YouTrack</a></li>
                    <li>
                        <userbar user="$ctrl.state"></userbar>
                    </li>
            </ul>
    </nav>
`;

export default angular

    .module( 'Top Menu Module', [
        require( './userbar' ).default
    ])

    .component( 'topMenu', { bindings: { state: '<' }, template })

    .name;
