class Controller {
	constructor (findPartnerActions, $scope) {
		this.actions = findPartnerActions;

    if ( $scope.idp ) {
      this.actions.fetch({ query: $scope.idp, first: true })
        .then( items => $scope.inputModel = items[0].title);
    }

    this.actions.init();
	}
}

export default Controller;
