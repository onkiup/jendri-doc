/**
 * Jendri history navigation script
 */

me.router = 'router';

var navigate = function (destination) {
    me.router.navigate(destination, function (err) {
        if (!err) {
            history.pushState({}, window.title, jj.base + destination);
        }
    });
}
var navigationEventListener = function(event) {
    var target = $(event.target);
    var destination = target.attr('href') || target.attr('submit');
    if (destination.match("javascript:")){
        return;
    }
    if (destination.substr(0, 1) === '#') {
        destination = destination.substr(1);
    }
    event.preventDefault();
    navigate(destination);
}

me.create = function() {
    $(document).on('click', 'a', navigationEventListener);
    $(document).on('submit', 'form', navigationEventListener);
    if (document.location.hash) {
        navigate(document.location.hash);
    } else if (document.location.pathname !== jj.base) {
        me.router.navigate
    }
    me.router.navigate(jj.home);
}