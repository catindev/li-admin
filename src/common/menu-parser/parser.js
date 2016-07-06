import { find, sortBy } from 'lodash';

const checkSubFeatures = ( subcategory, response ) => {
  let features = checkFeatures( subcategory.features, response );

  if ( features.length === subcategory.features.length ) return subcategory;
  else if ( features.length > 0 ) {
    let { title, id } = subcategory;
    return { title, id, features };
  }
};

const checkEndpoints = ( feature, response ) => {
  let endpoints = feature.endpoints.filter(
    point => {
      let endpoint = find( response,  { endpoint: `/${point.endpoint}` } );

      if ( !endpoint ) return false;
      if ( endpoint.methods.length === 0 ) return true;

      let methods = endpoint.methods.filter(
        method => endpoint.methods.indexOf( method ) !== -1
      );

      return methods.length === endpoint.methods.length;
    }
  );
  return endpoints.length === feature.endpoints.length;
}

const checkFeatures = ( features, response ) => {
  let resultFeatures = [];

  features.forEach(
    feature => {

      if ( 'features' in feature ) {
        let checkedSubCategory = checkSubFeatures( feature, response );
        if ( checkedSubCategory ) resultFeatures.push( checkedSubCategory );
      }


      if ( 'endpoints' in feature ) {
        let isAllEndpoints = checkEndpoints( feature, response );
        if ( isAllEndpoints ) resultFeatures.push(feature);
      }
    }
  );

  return resultFeatures;
};

export default (config, response) => {
  let menu = [];

  config.forEach(directory => {

    if ( directory.url ) {
      let { title, id, url } = directory;
      menu.push({ title, id, url });
      return;
    }

    let features = directory.features ? checkFeatures( directory.features, response ) : [];

    if ( features.length > 0 ) {
      features = sortBy( features, "title" );
      let { title, id } = directory;
      menu.push({ title, id, features });
    }

  });

  return menu;
};
