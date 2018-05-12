/**
 * Jendri history navigation script
 */

me.router = 'router';

var navigationEventListener = function(event) {
    if (destination.match("javascript:")){
        return;
    }
    event.preventDefault();
    var target = $(event.target);
    var destination = target.attr('href') || target.attr('submit');
    if (destination.substr(0, 1) === '#') {
        destination = destination.substr(1);
    }
    me.router.navigate(destination, function () {
        history.pushState({}, window.title, jj.baseURL() + destination);
    });
}

me.create = function() {
    $(document).on('click', 'a', navigationEventListener);
    $(document).on('submit', 'form', navigationEventListener);
    me.router.navigate(jj.home);
}