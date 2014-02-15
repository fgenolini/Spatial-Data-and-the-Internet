/*
Home page of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}
$(document).ready(function () {
    function setupLeaflet(result) {
        var course_progression = result;
        var lecture_slide_image = 'images/course_progression.png';
        var imageBounds = [[-4.6, -0.9], [0.2, 6.9]];
        var imageOptions = {
            opacity: 0.7,
            attribution: "Cranfield University (C) 2014, Dr. Steven Hallett"
        };
        var progression = L.imageOverlay(lecture_slide_image, imageBounds, imageOptions);

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
                        color: "#0000ff"
                    };
                }
            }
        };

        var steps = L.geoJson(course_progression, jsonOptions);

        var mapOptions = {
            center: new L.LatLng(-2.8, 4.1),
            zoom: 6.7,
            layers: [progression, steps]
        };
        var progression_map = L.map('progression_map', mapOptions);

        var baseLayers = {
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