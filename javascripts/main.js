/*
Home page of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if(typeof jQuery === 'undefined'){
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}
$(document).ready(function () {
    var course_progression;
    $.getJSON("course_progression.geojson", function (result) {
        console.log(result);
    });
});