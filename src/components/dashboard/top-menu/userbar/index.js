import styles from "./userbar.less";

const template = `
    <div class="${ styles.userbar }"
         ng-mouseover="$ctrl._hover = true"
         ng-mouseleave="$ctrl._hover = false">
        <button ng-class="[ $ctrl.styles.button, $ctrl.btnHover ]">
            <img ng-src="{{ $ctrl.avatarSrc }}" class="${ styles.avatar }">
            <div ng-class="[ $ctrl.styles.text, $ctrl.textHover ]">
                {{ $ctrl.user.name }}
                <b class="caret"></b>
            </div>
        </button>
        <div ng-show="$ctrl._hover" class="${ styles.content }">
            <!--<a>another link here</a>-->
            <a class="${ styles.divider }" ng-click="$ctrl.logout()">
                Выйти
            </a>
        </div>
    </div>
`;


class controller {
    constructor () {
        this.styles = styles;
        this._hover = false;
    }

    get btnHover() {
        if ( this._hover ) return styles.buttonHover;
        return '';
    }

    get textHover() {
        if ( this._hover ) return styles.textHover;
        return '';
    }

    get avatarSrc() {
        return this.user.avatar ||
            'https://cf.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png';
    }
}

export default angular

    .module( 'Userbar Module', [])

    .component( 'userbar', { bindings: { user: '<' }, controller, template })

    .name;
