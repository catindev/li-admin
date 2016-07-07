var crypto = require('crypto');
module.exports = function (request, response, next) {
	var token = crypto
		.createHash('md5')
		.update(new Date().getTime() + "")
		.digest('hex');

	// console.log(request.body)
	// console.log(request.query)

	if (('login' in request.query) && ('password' in request.query)) {
	  if (request.query.login === 'user' && request.query.password === 'pwd')
			return response.status(200).json({ "access_token": token }).end();
			response
				.status(400)
				.json({
					"code":400,
					"message":"Неверный логин или пароль",
					"errors":[]
				}).end();
	} else {
		response
			.status(400)
			.json({
				"code":400,
				"message":"Неверный логин или пароль",
				"errors":[]
			}).end();
	}
};
