me.maps = 'google/maps';
var map;

var options = {};

!function fillOptions() {
    var attributes = $(c).get(0).attributes;
    for (var i = 0; i < attributes.length; i++) {
        var name = attributes[i].nodeName || attributes[i].name;
        var value = attributes[i].nodeValue;
        if (value == undefined) continue;
        options[name] = value;
    }


    var controls = $('controls').get(0);
    if (controls) {
        options.mapTypeControlOptions = {};
        options.mapTypeControlOptions.position = $(controls).attr('position');
        options.mapTypeControlOptions.style = $(controls).attr('style');
        options.mapTypeControlOptions.mapTypeIds = [];
        $('*', controls).each(function (i, el) {
            options.mapTypeControlOptions.mapTypeIds.push($(el).get(0).tagName);
        });
    }

    var otherOptions = $('options').html();
    if (otherOptions) {
        otherOptions = 'otherOptions = '+otherOptions;
        eval(otherOptions);
        for (var i in otherOptions) {
            options[i] = otherOptions[i];
        }
    }

    $(c).html('');
}();

var processOptions = function () {
    for (var i in options) {
        if (typeof optionsConverters[i] == 'function') {
            options[i] = optionsConverters[i](options[i]);
        }
    }
}

$(c).on('start', function () {
    processOptions();
});

$(c).on('resume', function () {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(c, options);
})

var optionsConverters = {
    center: function (value) {
        value = value.split(',');
        if (value.length != 2 || value[0] == undefined || value[1] == undefined) {
            console.error('invalid center', value);
            throw "invalid center";
        }
        value[0] = parseFloat(value[0].trim());
        value[1] = parseFloat(value[1].trim());
        return new google.maps.LatLng(value[0], value[1]);
    },
    MapTypeId: function (value) {
        return google.maps.MapTypeId[value.toUpperCase()];
    },
    mapTypeControlOptions: function(value) {
        return {
            position: google.maps.ControlPosition[value.position.toUpperCase()],
            mapTypeIds: value.mapTypeIds,
            style: value.style
        }
    },
    OverviewMapControlOptions: function (value) {
        return {opened: true};
    },
    PanControlOptions: function (value) {
        return google.maps.ControlPosition[value.toUpperCase()];
    },
    RotateControlOptions: function(value) {
        return google.maps.ControlPosition[value.toUpperCase()];
    },
    ScaleControlOptions: function(value) {
        return {style: google.maps.ScaleControlStyle[value.toUpperCase()]};
    },
    zoom: parseInt,
}