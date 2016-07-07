export default angular

  .module('Tariffs Module', [
    require('./common').default,
    require('./price').default,
    require('./proposal').default,
  ])

  .name;
