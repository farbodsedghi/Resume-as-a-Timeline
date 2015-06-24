/**
 * Created by Farbod Sedghi on 3/9/2015.
 */

/**
 * Replace date (YYYY/MM/DD) to (March MM YYYY)
 * @param inputDate
 * @param type
 * @returns {string}
 */
function datef(inputDate, type){

    var date = inputDate.replace(/,/g, '/');
    var startDate = new Date(date);

    /////////////////////////////////////////
    var longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var sMonth = longMonths[startDate.getMonth()];

    if(sMonth == undefined){
        return "";
    }

    var sDay = startDate.getDate();

    var sYear = startDate.getFullYear();

    ////////////////////////////////////////

    var start = "<time>" + sMonth + " " + sDay + "," + sYear + "</time>";

    if(type){
        return '—' + start;
    } else {
        return start;
    }

    return "";
}

/**
 * Detect Internet Explorer Version
 * @returns {number}
 */
function ieVersion(){
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}

/**
 * Check image exist and return image tag (HTML) otherwise return empty string
 * @param media
 * @returns {string}
 */
function mediaError(media){

    var image = '<img width="100px" src="' + media + '" style="float:left; padding:5px;" alt="">';

    var response = jQuery.ajax({
        url: medi,
        type: 'HEAD',
        async: false
    }).status;

    return (response != "200") ? "" : image;
}

/**
 * Replace url string to url link in text
 * @param inputText
 * @returns {string}
 */
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //replacedText = inputText.replace(/["']/g, "");

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">Read More</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '<a href="http://$2" target="_blank">Read More</a>'); //$1

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">Read More</a>');

    return replacedText;
}