/**
 * Jendri history navigation script
 */

me.router = 'router';

var navigate = function (destination, back) {
    me.router.navigate(destination, function (err) {
        if (!back) {
            history.pushState({}, window.title, jj.base + destination);
        }
    });
}
var navigationEventListener = function (event) {
    var target = $(event.target);
    var destination = target.attr('href') || target.attr('submit');
    var back = false;
    if (destination) {
        if (destination.match("javascript:")) {
            return;
        }
        if (destination.substr(0, 1) === '#') {
            destination = destination.substr(1);
        }
    } else {
        destination = location.pathname.replace(jj.base, "");
        back = true;
    }
    event.preventDefault();
    navigate(destination, back);
}

me.create = function () {
    $(document).on('click', 'a', navigationEventListener);
    // $(document).on('submit', 'form', navigationEventListener);
    $(window).on('popstate', navigationEventListener);
    if (document.location.hash) {
        navigate(document.location.hash.substr(1));
    } else if (document.location.pathname !== jj.base) {
        me.router.navigate
    }
    me.router.navigate(jj.home);
}