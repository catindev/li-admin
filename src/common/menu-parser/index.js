import parse from "./parser";
import parseOld from "./parser.old";
import config from "./config";

export default accessInfo => {
  const menu = parse( config, accessInfo );
  return parseOld( menu, config, accessInfo );
}
