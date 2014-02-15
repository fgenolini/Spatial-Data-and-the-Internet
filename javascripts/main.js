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
        var imageBounds = [[-4.9, 0.1], [-0.29, 7.9]];
        var imageOptions = {
            opacity: 0.7,
            attribution: '&copy; 2014 Cranfield University, <a href="http://www.cranfield.ac.uk/about/people-and-resources/academic-profiles/sas-ac-profile/dr-stephen-sh-hallett.html">Dr. Stephen Hallett</a>'
        };
        var progression = L.imageOverlay(lecture_slide_image, imageBounds, imageOptions);

        var jsonStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.65
        };

        function addPopupText(feature, layer) {
            // does this feature have a property named text?
            var popupText = "";
            if (feature.properties) {
                if (feature.properties.text) {
                    popupText = feature.properties.text;
                }

                if (feature.properties.link1) {
                    popupText = '<a href="' + feature.properties.link1 + '">' + popupText + '</a>';
                }

                if (feature.properties.link2) {
                    popupText += ' and <a href="' + feature.properties.link2 + '">here</a> also';
                }

                layer.bindPopup("See " + popupText);
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
            center: new L.LatLng(-2.6, 4.0),
            zoomControl: false,
            minZoom: 6.7,
            maxZoom: 6.7,
            zoom: 6.7,
            layers: [progression, steps]
        };
        var progression_map = L.map('progression_map', mapOptions);
        progression_map.touchZoom.disable();
        progression_map.doubleClickZoom.disable();
        progression_map.scrollWheelZoom.disable();
        progression_map.boxZoom.disable();
        progression_map.keyboard.disable();

        var baseLayers = {
            "Progression": progression
        };

        var overlays = {
            "Steps": steps
        };

        var layerControlOptions = {
            autoZIndex: true
        };
        L.control.layers(baseLayers, overlays, layerControlOptions).addTo(progression_map);
    }

    $.getJSON("course_progression.geojson", function (result) {
        setupLeaflet(result);
    });
});