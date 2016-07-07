import appState from "common/state";
const menu = appState.select('sidemenu');

class SidemenuActions {
  
  
  get category() {
    return menu.get().category;
  }

  set category(value) {
    menu.merge({
      category: value, item: null, subitem: null
    });
  }

  get item() {
    return menu.get().item;
  }

  set item(value) {
    return menu.set('item', value);
  }

  get subitem() {
    return menu.get().subitem;
  }

  set subitem(value) {
    return menu.set('subitem', value);
  }

  isActive(type, id) {
    return menu.get()[type] === id;
  }

}

export default SidemenuActions;
