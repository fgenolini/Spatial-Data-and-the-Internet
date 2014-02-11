/*
Day 2 of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if(typeof jQuery === 'undefined'){
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}
$(document).ready(function () {
    var googleMap;
    function googleMapInitialize() {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8
        };
        googleMap = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    }

    googleMapInitialize();
    google.maps.event.trigger(googleMap, 'resize');

});