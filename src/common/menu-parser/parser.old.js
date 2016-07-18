import { find, remove, sortBy, has, findIndex } from 'lodash';

function parse( menu, fe, be ) {
  let BE = be.filter(e => has(e, "endpoint") ? false : e);

  fe.forEach(category => {
    let features = [];

    category.functions && category.functions.forEach( id => {
      let item = find(BE, { id });
      if ( item ) {
        features.push( item );
        remove(BE, { id });
      }
    });
    
    if ( features.length > 0 ) {
      features = sortBy( features, "title" );
      let { title, id } = category;

      const categoryIndex = findIndex( menu, { id });
      if ( categoryIndex != -1 ){
        menu[ categoryIndex ].features = menu[ categoryIndex ].features.concat(features);
      } else menu.push({ title, id, features });
    }
    
  });

  if (BE.length > 0) {
    let title = "Дополнительные функции",
      id = "additionals",
      features = BE;
    menu.push({ title, id, features });
  }

  return menu;
}

export default parse;
