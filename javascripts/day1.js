/*
Day 1 of module A1136 Spatial Data and the Internet, Cranfield University (UK)

Image copied from http://www.visitisleofwight.co.uk/acoustic-isle 
and edited to remove the text
*/
if (typeof jQuery === 'undefined') {
    document.write(unescape("%3Cscript src='javascripts/jquery-1.11.0.min.js' type='text/javascript'%3E%3C/script%3E"));
}

// Use JavaScript to replace title and intro with a canvas (picture)
$(document).ready(function () {
    // Find out if HTML 5 canvas is supported
    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    if (!isCanvasSupported()) {
        // No Canvas, probably not HTML 5
        return;
    }

    // Trim spaces and non-printing characters at both ends
    function trim1(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    // Get the page title's text, hide the title
    var day1_title = trim1($("#day1_title").html());
    $("#day1_title").hide();
    var title_words = day1_title.split(" ");
    var title_array = new Array(4);
    title_array[0] = "";
    var array_index = 0;
    var maxCharLen = 9;
    for (var i = 0; i < title_words.length; i++) {
        var word = title_words[i];
        var word_len = word.length;
        if (title_array[array_index].length + word_len < maxCharLen) {
            if (title_array[array_index].length > 0) {
                title_array[array_index] += " ";
            }

            title_array[array_index] += word;
            continue;
        } else {
            array_index++;
            title_array[array_index] = "";
        }

        if (word.length > maxCharLen) {
            // Too big, so put it in (will be clipped)
            if (title_array[array_index].length > 0) {
                array_index++;
            }

            title_array[array_index] = word;
            array_index++;
            title_array[array_index] = "";
            continue;
        }

        title_array[array_index] = word;
        array_index++;
        title_array[array_index] = "";
    }

    // Get the page's introduction, hide the introduction
    var day1_intro = trim1($("#day1_intro").html()).replace(/[\n\r]/g, '').replace(/ +(?= )/g, '');
    $("#day1_intro").hide();

    // Paint the title and the introduction on a canvas
    $("#day1_header").append('<canvas id="header_canvas" width="746" height="325"></canvas>');
    var header_canvas = $("#header_canvas");
    var header_canvas_context = header_canvas[0].getContext('2d');
    var isleofwight_grass_red = new Image();
    isleofwight_grass_red.onload = function () {
        // Draw background image (Isle of Wight grass)
        header_canvas_context.drawImage(isleofwight_grass_red, 0, 0);
        // Write text of intro at bottom left (with mirror text under it)
        header_canvas_context.font = "12px sans-serif";
        header_canvas_context.save();
        header_canvas_context.translate(header_canvas[0].width /2, header_canvas[0].height /2);
        header_canvas_context.scale(1, -1);
        header_canvas_context.fillStyle = 'red';
        header_canvas_context.fillText(day1_intro, -363, -148);
        header_canvas_context.restore();
        header_canvas_context.fillText(day1_intro, 10, 310);
        // Write text of title on top right square, tilt it
        header_canvas_context.font = "32px sans-serif";
        header_canvas_context.rotate(9 * Math.PI / 180);
        header_canvas_context.translate(590, -67);
        var y = 0;
        for (var i = 0; i < title_array.length; i++) {
            var fragment = title_array[i];
            if (fragment === undefined) {
                break;
            }

            header_canvas_context.fillText(fragment, 0, y);
            y += 40;
        }
    };
    isleofwight_grass_red.src = 'images/isleofwight_grass_red.png';
});