/*
Day 4 of module A1136 Spatial Data and the Internet, Cranfield University (UK)

The Aitana dataset will only work from within the Cranfield University LAN,
as it uses a local private PC (not on the Internet) as ArcGIS Server
*/
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

$(document).ready(function () {
    var dojoConfig = { parseOnLoad: true };
    var fgenoliniAitanaArcGisOnlineMapId = "e297c36a60424a0181ad64572ffaaaf9";
    var arcgis_map;
    require([
        "esri/map",
        "esri/arcgis/utils",
        "esri/dijit/Legend",
        "dojo/domReady!"
    ], function (Map, arcgisUtils, Legend) {
        arcgisUtils.createMap(fgenoliniAitanaArcGisOnlineMapId, "arcgis_map").then(function (response) {
            arcgis_map = response.map;
            var legend = new Legend({
                map: arcgis_map,
                layerInfos: (arcgisUtils.getLegendLayers(response))
            }, "arcgis_legend");

            legend.startup();
        });
    });

    function init() {
        // Base map showing cultural information
        // Public ESRI base map layer
        //var esriPublicServer = "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer";
        //var baseMap = new esri.layers.ArcGISTiledMapServiceLayer(esriPublicServer, { opacity: 0.4 });
        //map.addLayer(baseMap);

        // ESRI ArcGIS Server located on the private LAN
        // within Cranfield University, not a public server
        // Aitana sample data set
        //var cranfieldUniversityLocalServer = "http://ssw7311f.sims.cranfield.ac.uk:6080/arcgis/rest/services/SDI/SDI/MapServer";
        //var cranfieldLayerOptions = {
        //    opacity: 0.6
        //};
        //var layer = new esri.layers.ArcGISDynamicMapServiceLayer(cranfieldUniversityLocalServer,
        //    cranfieldLayerOptions);
        // WMS data from public server
        //var wmsLayer = new esri.layers.WMSLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/WMSServer");
        //wmsLayer.setVisibleLayers([2]);
        //wmsLayer.setImageFormat("png");
        //map.addLayer(wmsLayer);
    }
});