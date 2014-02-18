/*
Assignment for module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

$(document).ready(function () {
    require([
        'dojo/parser',
        'isle_of_wight/soil',
        'dijit/form/Button',
        'dijit/layout/TabContainer',
        'dijit/layout/ContentPane'
    ], function (parser, soil) {
        parser.parse();
        var soil_layer = isle_of_wight.Soil(
            {
                soilLayerUrl: 'my_test_soil.geojson'
            }
        );
        soil_layer.setText('greeting', 'Hello Dojo!');
        setTimeout(function () {
            soil_layer.restoreText('greeting');
        }, 3000);
    });
});
