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

    var progression_map = L.map('progression_map').setView([35, -2.2], 4);

    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
        key: 'BC9A493B41014CAABB98F0471D759707'
    }).addTo(progression_map);
    L.geoJson(course_progression).addTo(progression_map);
});