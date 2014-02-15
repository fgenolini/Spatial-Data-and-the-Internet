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

        var lecture_slide_image = 'images/course_progression.png';
        var imageBounds = [[0.0, -4.5], [7.1, -0.6]];
        var progression = L.imageOverlay(lecture_slide_image, imageBounds);

        var jsonStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };

        function addPopupText(feature, layer) {
            // does this feature have a property named text?
            if (feature.properties && feature.properties.text) {
                layer.bindPopup(feature.properties.text);
            }
        }

        var jsonOptions = {
            onEachFeature: addPopupText,
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

        var steps = L.geoJson(course_progression, jsonOptions);

        var mapOptions = {
            center: new L.LatLng(-2.8, 4.1),
            zoom: 6.7,
            layers: [world, progression, steps]
        };
        var progression_map = L.map('progression_map', mapOptions);

        var baseLayers = {
            "World": world
        };

        var overlays = {
            "Progression": progression,
            "Steps": steps
        };

        L.control.layers(baseLayers, overlays).addTo(progression_map);
    }

    $.getJSON("course_progression.geojson", function (result) {
        setupLeaflet(result);
    });
});