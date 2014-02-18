/*
  Day 2 of module A1136 Spatial Data and the Internet, Cranfield University (UK)

  Web mapping APIs for JavaScript
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}
// After Google Map API is loaded, create map objects and display them
function createGoogleMaps() {
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
    // After Microsoft Bing Map API is loaded, create map objects and display them
    function createBingMaps() {
        var francoisGenoliniBingMapKey = "Aq0-VaNroXMdVfdlVLkkTceilJUYVhg1cyAw0vjVrrRB8jKHzRgcVLmHyfagMV3L";
        var redmondMapOptions = {
            credentials: francoisGenoliniBingMapKey,
            center: new Microsoft.Maps.Location(47.640049, -122.129797),
            mapTypeId: Microsoft.Maps.MapTypeId.aerial, // Could also use "road"
            zoom: 16
        };
        var bingMapRedmond = new Microsoft.Maps.Map(document.getElementById("map_redmond"), redmondMapOptions);
        // XXX TODO call dispose() on the map after using it
    }

    // After Open Layers Map API is loaded, create map objects and display them
    function createOpenLayersMaps() {
        var canadaMapOptions = {
            center: new OpenLayers.LonLat(-73.55, 45.51)
        };
        var canadaMap = new OpenLayers.Map('map_canada', canadaMapOptions);
        var wholeEarth = new OpenLayers.Layer.WMS("OpenLayers WMS",
                "http://vmap0.tiles.osgeo.org/wms/vmap0",
                { layers: 'basic' });
        var canada = new OpenLayers.Layer.WMS("Canada",
            "http://www2.dmsolutions.ca/cgi-bin/mswms_gmap",
            {
                layers: "road,popplace",
                transparent: "true",
                format: "image/png"
            },
            {
                isBaseLayer: false,
                visibility: false
            });
        canadaMap.addLayers([wholeEarth, canada]);
        canadaMap.addControl(new OpenLayers.Control.LayerSwitcher());
        canadaMap.zoomTo(4);
    }

    // After Leaflet Map API is loaded, create map objects and display them
    function createLeafletMaps() {
        var londonMap = L.map('map_london').setView([51.505, -0.09], 13);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(londonMap);
    }

    // Asynchronous loading of Google maps API to allow full HTML to load first
    var googleMapScriptUrl = "https://maps.googleapis.com/maps/api/js?v=3.exp";
    var francoisGenoliniGoogleMapKey = "AIzaSyBuIzCvh7jFg3S5NoH8SQmPpVDjNkmFDGo";
    var googleMapCallback = "callback=createGoogleMaps";
    $.getScript(googleMapScriptUrl
        + "&key=" + francoisGenoliniGoogleMapKey
        + "&sensor=false&" + googleMapCallback);

    createBingMaps();

    createOpenLayersMaps();

    createLeafletMaps();
});