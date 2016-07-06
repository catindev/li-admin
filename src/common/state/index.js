import Baobab from 'baobab';
import initial from './initial';

const logger = (previousState, newState, affectedPaths) => {
  console.groupCollapsed('State change:');
  console.log('Affected paths', affectedPaths.map( path => path.join('/')));
  console.log('New state', newState);
  console.log('Previous state', previousState);
  console.groupEnd();
};

const config = {
	maxHistory: 10,
	validate: logger
};

const tree = new Baobab( initial, config );

export default tree;
