class Controller {
	constructor (findPartnerActions) {
		this.actions = findPartnerActions;
	}
}
Controller.$inject = ['findPartnerActions'];
export default Controller;
