/*
  Day 5 (last day) of module A1136 Spatial Data and the Internet, Cranfield University (UK)
*/
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

$(document).ready(function () {
    var lon = -1.552;
    var lat = 52.443;
    var zoom = 15;

    var mapOptions = {
        projection: new OpenLayers.Projection("EPSG:900913")
    };
    var foss_map = new OpenLayers.Map('foss_map', mapOptions);
    var google_layer = new OpenLayers.Layer.Google("Google Physical",
        {
            'sphericalMercator': true
        });

    var foss_layer = new OpenLayers.Layer.OSM("OpenStreetMap");

    var land_registry = new OpenLayers.Layer.WMS("UK land registry (INSPIRE WMS)",
        "http://inspire.landregistry.gov.uk/inspire/ows",
        {
            layers: 'inspire:CP.CadastralParcel',
            format: "image/png",
            transparent: true
        }, {
            opacity: 0.5
        }
        );

    foss_map.addLayers([google_layer, foss_layer, land_registry]);
    foss_map.addControl(new OpenLayers.Control.LayerSwitcher());
    var center = new OpenLayers.LonLat(lon, lat);
    center.transform(new OpenLayers.Projection("EPSG:4326"), foss_map.getProjectionObject());
    foss_map.setCenter(center, zoom);
});