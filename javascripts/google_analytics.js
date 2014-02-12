/*
Only call Google Analytics over the web (http:),
not when viewing the pages locally (file:)
*/
function call_google_analytics() {
    var francoisGenoliniGoogleAnalyticsID = 'UA-47932087-1';
    var francoisGenoliniWebSite = 'fgenolini.github.io';
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', francoisGenoliniGoogleAnalyticsID, francoisGenoliniWebSite);
    ga('send', 'pageview');
}

switch (window.location.protocol) {
    case 'http:':
    case 'https:':
        call_google_analytics();
        break;
    default:
        // No Google Analytics
}

