import appConfig from "common/utils/config";

class Controller {
	constructor ($scope) {
    $scope.opts = appConfig.modelOptions;
	}
}

export default Controller;
