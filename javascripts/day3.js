/*
Day 3 of module A1136 Spatial Data and the Internet, Cranfield University (UK)
 */
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

$(document).ready(function () {
    var ge = null;

    function initCallback(instance) {
        ge = instance;
        ge.getWindow().setVisibility(true);
        ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);
        var link = ge.createLink('');
        //var href = 'http://public.cranfield.ac.uk/ss01shh/gim/25k.kml';
        var href = 'http://fgenolini.github.io/Spatial-Data-and-the-Internet/kml/hangar.kmz';
        link.setHref(href);
        var networkLink = ge.createNetworkLink('');
        networkLink.set(link, true, true);
        // Sets the link, refreshVisibility, and flyToView
        ge.getFeatures().appendChild(networkLink);
    }

    function failureCallback(errorcode) {
        console.log("Google Earth error:" + errorcode);
    }

    function initGoogleEarth() {
        google.earth.createInstance("map3d", initCallback, failureCallback);
    }

    google.load("earth", "1.x", { "other_params": "sensor=false", "callback": initGoogleEarth });
});