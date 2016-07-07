

module.exports = function (request, response, next) {

	if ('access_token' in request.query) {
		response
			.status(200)
			.json([
				{
						partner: {
								title: "ООО Рога и Копыта",
								pid: "111"
						},
						manager: "Иванов Иван",
						file: "test.xsls",
						sms: "431.9",
						frod: "763.54"
				},
				{
						partner: {
								title: "Партнёры и Ко",
								pid: "222"
						},
						manager: "Петрова Мария",
						file: "test.xsls",
						sms: "221.2",
						frod: "113.55"
				}
			]);
		return;
	}

	response
		.status(400)
		.json({
      code: 403,
      message: "Сессия истекла либо не создавалась",
      errors: []
    });

};
