/*
Home page of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}
$(document).ready(function () {
    var course_progression;
    $.getJSON("course_progression.geojson", function (result) {
        course_progression = result;
    });

    var world = L.tileLayer('http://{s}.tile.cloudmade.com/API-key/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>[…]',
        maxZoom: 18
    });

    var jsonStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };

    var jsonOptions = {
        style: function (feature) {
            console.log("Feature: " + feature);
            switch (feature.properties.meta_type) {
                case 'plan': return { color: "#ff0000" };
                case 'lecture': return { color: "#0000ff" };
            }
        }
    };

    var progression_json = L.geoJson(course_progression, jsonOptions);

    var mapOptions = {
        center: new L.LatLng(35, -2.2),
        zoom: 10,
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
});