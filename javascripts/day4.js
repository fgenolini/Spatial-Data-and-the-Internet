/*
Day 4 of module A1136 Spatial Data and the Internet, Cranfield University (UK)

This will only work from within the Cranfield University LAN,
as it uses a local private PC (not on the Internet) as ArcGIS Server
*/
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

$(document).ready(function () {
    // ESRI ArcGIS Server located on the private LAN
    // within Cranfield University, not a public server
    var cranfieldUniversityLocalServer = "http://ssw7311f.sims.cranfield.ac.uk:6080/arcgis/rest/services/SDI/SDI/MapServer";

    var djConfig = { parseOnLoad: true };
    dojo.require("dijit.layout.BorderContainer");
    dojo.require("dijit.layout.ContentPane");
    dojo.require("esri.map");
    var map;

    function init() {
        map = new esri.Map("map");
        var layer = new esri.layers.ArcGISDynamicMapServiceLayer(cranfieldUniversityLocalServer);
        map.addLayer(layer);
        var resizeTimer;
        dojo.connect(map, 'onLoad', function (theMap) {
            dojo.connect(dijit.byId('map'), 'resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    map.resize();
                    map.reposition();
                }, 500);
            });
        });
    }

    dojo.addOnLoad(init);
});