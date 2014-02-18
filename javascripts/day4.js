/*
Day 4 of module A1136 Spatial Data and the Internet, Cranfield University (UK)

The Aitana dataset was supplied by Cranfield University during the course week,
then uploaded to ArcGIS online as shapefile, then a public web map was created.
This script utilises the public web map
*/
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

$(document).ready(function () {
    var dojoConfig = { parseOnLoad: true };
    require([
        "esri/map",
        "esri/arcgis/utils",
        "esri/dijit/Legend",
        "dojo/domReady!"
    ], function (Map, arcgisUtils, Legend) {
        var fgenoliniAitanaArcGisOnlineMapId = "e297c36a60424a0181ad64572ffaaaf9";
        var configOptions = {
            webmap: fgenoliniAitanaArcGisOnlineMapId,
            title: "",
            subtitle: "",
            sharingurl: "http://www.arcgis.com/sharing/content/items"
        };

        // Proxy must be setup otherwise CORS will prevent browser from accessing data
        arcgisUtils.arcgisUrl = configOptions.sharingurl;
        esri.config.defaults.io.proxyUrl = "/proxy";
        var urlObject = esri.urlToObject(document.location.href);
        urlObject.query = urlObject.query || {};
        if (urlObject.query && urlObject.query.webmap) {
            configOptions.webmap = urlObject.query.webmap;
        }

        arcgisUtils.createMap(configOptions.webmap, "arcgis_map").then(function (response) {
            var arcgis_map = response.map;
            var legend = new Legend({
                map: arcgis_map,
                layerInfos: (arcgisUtils.getLegendLayers(response))
            }, "arcgis_legend");

            legend.startup();
        });
    });
});