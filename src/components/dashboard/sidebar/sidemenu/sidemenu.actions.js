import appState from "common/state";
const menu = appState.select('sidemenu');

class SidemenuActions {
  
  
  get category() {
    let { category } = menu.get() || {};
    return category;
  }

  set category( value ) {
    menu.merge({
      category: value, item: null, subitem: null
    });
  }

  get item() {
    let { item } = menu.get() || {};
    return item;
  }

  set item(value) {
    return menu.set('item', value);
  }

  get subitem() {
    let { subitem } = menu.get() || {};
    return subitem;
  }

  set subitem( value ) {
    return menu.set('subitem', value);
  }

  isActive(type, id) {
    let _menu = menu.get();
    return _menu ? _menu[type] === id : null;
  }

}

export default SidemenuActions;
