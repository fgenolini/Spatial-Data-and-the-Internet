/*
Home page of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}
$(document).ready(function () {
    function setupLeaflet(result) {
        var course_progression = result;

        var world = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
            key: 'BC9A493B41014CAABB98F0471D759707'
        });

        var jsonStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };

        var jsonOptions = {
            style: function (feature) {
                switch (feature.properties.meta_type) {
                    case 'plan': return {
                        color: "#ff0000"
                    };
                    case 'lecture': return {
                        opacity: 1.0,
                        color: "#0000ff"
                    };
                }
            }
        };

        var progression_json = L.geoJson(course_progression, jsonOptions);

        var mapOptions = {
            center: new L.LatLng(-2.2, 6),
            zoom: 7,
            layers: [world, progression_json]
        };
        var progression_map = L.map('progression_map', mapOptions);

        var baseLayers = {
            "World": world
        };

        var overlays = {
            "Progression": progression_json
        };

        L.control.layers(baseLayers, overlays).addTo(progression_map);
    }

    $.getJSON("course_progression.geojson", function (result) {
        setupLeaflet(result);
    });
});