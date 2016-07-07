import { parse, stringify } from 'qs';

const read = () => {
  const qs = window.location.search.substr(1);
  return qs ? parse( qs ) : false;
};

const write = form => {
  const path = form ? `${ window.location.origin }${ window.location.pathname }?${ stringify(form) }` : window.location.href;
  window.history.pushState({ path }, ' ', path);
};

export default { read, write }
