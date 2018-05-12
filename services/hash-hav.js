me.router = 'router';

var routerChecker;
var Router = {};

Router.startAnchorChecker = function () {
    if (!routerChecker) {
        routerChecker = setInterval(function () {
            if (window.location.hash !== previousLoadedAnchor) {
                try {
                    console.log('Navigating to page', window.location.hash, uiReady);
                    me.router.navigate(window.location.hash, function () {
                        if (!me.jendri.debug)
                            console.clear();
                    });
                } catch (e) {
                    clearInterval(routerChecker);
                    if (!me.jendri.debug)
                        console.clear();
                    throw e;
                }
            }
        }, 100);
    }
}

Router.stopAnchorChecker = function () {
    clearInterval(routerChecker);
    routerChecker = undefined;
}


me.resume = function () {
    Router.startAnchorChecker();
}

me.pause = function() {
    Router.stopAnchorChecker();
}