// На старт роута проверяет возвращает true
// если URI не изменился

export default (next, current) => next.$$route.originalPath !== current.$$route.originalPath;
