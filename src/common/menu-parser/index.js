import parse from "./parser";
import parseOld from "./parser.old";
import config from "./config";

import { merge, findIndex } from "lodash";

export default accessInfo => {
  const menu = parse( config, accessInfo );
  const oldMenu = parseOld( config, accessInfo );

  (oldMenu.length > 0) && oldMenu.forEach( item => {
    const index = findIndex( menu, { id: item.id });
    (index !== -1) ?
      menu[ index ] = merge( menu[ index ], item)
      :
      menu.push( item );
  });

  return menu;
}
