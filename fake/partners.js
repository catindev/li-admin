var partners = require('./fpartners');

module.exports = function (request, response, next) {

	if ('access_token' in request.query) {
		var limit = 6;
		var offset = parseInt(request.query.offset) || 0;
		var search_query = request.query.search_query || null;

		if (search_query) {
			// кейс - поиск
			response
				.status(200)
				.json({
					items: [
						{ pid: 111, title: "Рога и копыта, id111" },
						{ pid: 222, title: "ООО Рог-н-ролл, id222" },
					],
					has_more: false
				});
		} else {
			// кейс - дропдаун
			if (offset > 0) {
				var next_page = partners.slice(Math.max(partners.length - 6, 1));
				response
					.status(200)
					.json({ items: next_page , has_more: false });
			} else {
				var first_page = partners.slice(0,6);
				response
					.status(200)
					.json({ items: first_page , has_more: true });
			}
		}
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
