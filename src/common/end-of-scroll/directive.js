function directive() {
    return {
        restrict: 'A',
        link: function ( scope, element, attrs ) {
            var raw = element[0];
            element.bind('scroll', function() {
                let isEnd = raw.scrollTop + raw.offsetHeight > raw.scrollHeight;
                if ( isEnd ) scope.$apply( attrs.endOfScroll );
            });
        }
    };
}

export default directive;
