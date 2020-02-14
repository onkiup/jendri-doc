/**
 * Created by chedim on 3/31/15.
 */



$(me).on('create', function() {
    me.jendri.callbacks.maps = mapsCallback;
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=" + me.jendri.service.google.maps.key +
        "&sensor=" + me.jendri.service.google.maps.sensor + "&callback=J.callbacks.maps";

    document.body.appendChild(script);
});

var mapsCallback = function() {
    delete me.jendri.callbacks.maps;
    me.jendri.register('google/maps', window.google.maps);
}
