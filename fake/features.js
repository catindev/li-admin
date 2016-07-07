var items = require('./fitems');
module.exports = function (request, response, next) {

	if ('access_token' in request.query) return response
		.status(200)
		.json(items)
		.end();

	response
		.status(400)
		.json({
        code: 403,
        message: "Сессия истекла либо не создавалась",
        errors: []
    })
		.end();

};
