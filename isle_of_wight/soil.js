define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/fx',
    'dojo/NodeList-dom',
    'dojo/NodeList-traverse',
    'dojo/NodeList-manipulate',
    "dojo/NodeList-fx",
    "dojo/NodeList-data"
], function (declare, lang, array, dom, domConstruct, query, fx) {
    // Once all modules in the dependency list have loaded, this
    // function is called to define the isle_of_wight/soil module.

    // This returned object becomes the defined value of this module
    return declare("isle_of_wight.Soil", null, {
        soilLayerUrl: {},
        oldText: {},

        constructor: function (args) {
            this.oldText = [];
            declare.safeMixin(this, args);
        },

        setText: function (id, text) {
            query(".soil").data("updated", this.soilLayerUrl).style("color", "red").slideTo({
                left: 500, auto: true
            })
            .animateProperty({
                properties: {
                    backgroundColor: { start: "#fff", end: "#ffc" }
                }
            })
            .play();

            var greeting = dom.byId(id);
            this.oldText[id] = greeting.innerHTML;
            greeting.innerHTML = text;
            fx.slideTo({
                node: greeting,
                top: 100,
                left: 500
            }).play();
        },

        restoreText: function (id) {
            query(".soil").data("updated").forEach(function (soilUrl) {
                console.log("Soil URL from soil class member: " + soilUrl);
            });
            query("#soil_article").forEach(function (soilNode) {
                domConstruct.create("b", {
                    innerHTML: "done!",
                    style:
                        {
                            color: "red"
                        }
                }, soilNode);
            });

            var node = dom.byId(id);
            node.innerHTML = this.oldText[id];
            delete this.oldText[id];
        }
    });
});