const fullWindowHeight = ($window) => {
  return {
    restrict: 'A',
    link: function (scope, element) {
      let handler = () => {
        element[0].style.height = document.body.offsetHeight + "px";
        console.log(':D FWH handled!');
      };
      handler();
      $window.addEventListener("resize", handler, false);
    }
  };
}

export default fullWindowHeight;
