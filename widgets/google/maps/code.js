me.maps = 'google/maps';
var map;

var options;

!function fillOptions() {
    var attributes = $(c).get(0).attributes;

    options = $(c).text();

    $(c).html('');
}();

var processOptions = function () {
    var otherOptions = options;
    options = {};
    otherOptions = 'options = '+otherOptions;
    eval(otherOptions);
}

$(c).on('start', function () {
    processOptions();
});

$(c).on('resume', function () {
    console.log('map options:', options);
    map = new google.maps.Map(c, options);
})
