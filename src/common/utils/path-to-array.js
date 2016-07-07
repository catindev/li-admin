export default path => {
  let pathArray = path.split('/');
  pathArray.splice( 0, 1 );
  return pathArray;
};
