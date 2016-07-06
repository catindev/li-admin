import { stringify } from 'qs';

let fromArray = (name, arr) => {
    let params = [];
    arr.forEach( value => params.push( `${name}=${value}` ) );
    return params.join( '&' );
}

let fromJSON = data => decodeURIComponent( stringify(data) );

let сontentType = { 'Content-Type': 'application/x-www-form-urlencoded' };

export default {
    fromArray,
    fromJSON,
    сontentType
}    