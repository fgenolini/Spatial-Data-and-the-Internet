/*
Day 2 of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

function createMaps() {
    var googleMapCranfield;
    var lineColour = '#0000FF'; // Blue
    var lineThickness = 3;
    var lineOpacity = 0.4;

    var googleMapSydney;

    function googleMapInitialize() {
        var sydneyMapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        googleMapSydney = new google.maps.Map(document.getElementById("map_sydney"),
            sydneyMapOptions);

        var cranfieldCentrePoint = new google.maps.LatLng(52.07437309560945, -0.6273464687520239);
        var cranfieldMapOptions = {
            zoom: 19,
            center: cranfieldCentrePoint,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        googleMapCranfield = new google.maps.Map(document.getElementById("map_cranfield"), cranfieldMapOptions);
    }

    function setupCranfieldMarkers() {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(52.07437309560945, -0.6273464687520239),
            map: googleMapCranfield,
            title: "B33"
        });
        //marker.setMap(map); 
        var b33_outline = new google.maps.Polyline({
            path: [new google.maps.LatLng(52.07434957966827, -0.6269634995542505),
             new google.maps.LatLng(52.07457710359038, -0.6274448423720855),
             new google.maps.LatLng(52.07452613850875, -0.6275128208117877),
             new google.maps.LatLng(52.07448946486021, -0.6274361189804552),
             new google.maps.LatLng(52.0744592129024, -0.6274717468446056),
             new google.maps.LatLng(52.07441738116782, -0.6273891078529914),
             new google.maps.LatLng(52.07444771087575, -0.6273514251848695),
             new google.maps.LatLng(52.07437607432299, -0.6271968991027279),
             new google.maps.LatLng(52.07434335973053, -0.6272341859948227),
             new google.maps.LatLng(52.07430561142042, -0.6271506315728175),
             new google.maps.LatLng(52.07433716152372, -0.6271110693981399),
             new google.maps.LatLng(52.07429804778843, -0.6270294463392645),
             new google.maps.LatLng(52.07434957966827, -0.6269634995542505)],
            strokeColor: lineColour,
            strokeWeight: lineThickness,
            strokeopacity: lineOpacity
        });
        google.maps.event.addListener(marker, "click", function (event) {
            infowin =
              new google.maps.InfoWindow({
                  position: new google.maps.LatLng(52.07437309560945, -0.6273464687520239),
                  content: "<b>B33</b><br />Here is Building 33<br/>"
              });
            infowin.open(googleMapCranfield, marker);
        });
        google.maps.event.addListener(marker, "mouseover", function (event) { b33_outline.setMap(googleMapCranfield) });
        google.maps.event.addListener(marker, "mouseout", function (event) { b33_outline.setMap(null) });
    }

    googleMapInitialize();
    setupCranfieldMarkers();
    google.maps.event.trigger(googleMapSydney, 'resize');
    google.maps.event.trigger(googleMapCranfield, 'resize');
}

$(document).ready(function () {
    // Asynchronous loading of Google maps API to allow full HTML to load first
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBuIzCvh7jFg3S5NoH8SQmPpVDjNkmFDGo&sensor=false&' +
        'callback=createMaps';
    document.body.appendChild(script);
});