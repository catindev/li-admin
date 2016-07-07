module.exports = function (request, response, next) {

	if ('access_token' in request.query) {
		response
			.status(200)
			.json({ pid: 111, title: "Рога и копыта" });
	}

	response
		.status(400)
		.json({
      code: 403,
      message: "Сессия истекла либо не создавалась",
      errors: []
    });

};
