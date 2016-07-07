module.exports = function (request, response, next) {

	if ('access_token' in request.query) return response
		.status(200)
		.json({
			"name":"Иванов Иван",
			"avatar": "https://cf.dropboxstatic.com/static/images/avatar/faceholder-32-vflKWtuU5.png"
		})
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
