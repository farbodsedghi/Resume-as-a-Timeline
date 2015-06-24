/**
 * Created by Farbod Sedghi on 03/09/2015.
 */
jQuery.noConflict();

(function ($) {
    $(function () {

        var emdid = Drupal.settings.cv_timeline.embed_id;

        var settings = {

            ttype: Drupal.settings.cv_timeline.type,
            wsize: Drupal.settings.cv_timeline.width,
            hsize: Drupal.settings.cv_timeline.height,
            ffont: Drupal.settings.cv_timeline.font,
            fsize: Drupal.settings.cv_timeline.size,
            weight: Drupal.settings.cv_timeline.weight,
            jjson: Drupal.settings.cv_timeline.json

        };

        $(this).timeline(emdid,settings);

        $('#driver').click(function() {
            var clicks = $(this).data('clicks');
            if (clicks) {
                // odd clicks
                $(this).timeline(emdid,settings)
            } else {
                // even clicks
                $(this).milestone(emdid, settings)
            }
            $(this).data("clicks", !clicks);
        });


    });

    ///////////////////////////////////////////////////////
    $.fn.milestone = function (emdid, settings) {


        $.getJSON(settings.jjson, function (jd) {

            $('#driver').attr('value', 'View the interactive timeline');

            $('#' + emdid).empty();
            $('#' + emdid).removeAttr('style');
            $('#' + emdid).width(settings.wsize);
            $('#' + emdid).append('<table id="stage"></table>');

            for (var i = 0; i < jd.timeline.date.length; i++) {
                $('#stage').append('<tr class="milestones"><td>'+
                '<p class="milestones bold">' + jd.timeline.date[i].headline + '</p>'+
                '<p class="milestones date">'+
                           datef(jd.timeline.date[i].startDate, false) +
                           datef(jd.timeline.date[i].endDate, true) +
                        '</p>'+
                '<p class = "milestones contents">'+
                            '<img class="milestones images"  src="' + jd.timeline.date[i].asset.media + '" alt="">'+
                            linkify(jd.timeline.date[i].text) + '</p>'+
                '</td></tr>');
            }

            $('.milestones').css({
                "font-family" : settings.ffont,
                "font-size": settings.fsize,
                "font-weight": settings.weight
            });

            $("#stage tr:odd").css("background-color", "#E4E4E4");
            $("#stage tr:even").css("background-color", "#FAFAFA");

            $(".milestones .contents img").error(function(){
                $(this).hide();
            });

            $("#stage").hide().fadeIn('fast');
        });

    };

    $.fn.timeline = function (emdid, settings) {

        if (!$(this).compatible())
            $(this).milestone(emdid, settings);

        $('#' + emdid).empty();
        $('#driver').attr('value', 'View the list of milestones');

        createStoryJS({
            type: settings.ttype,
            width: settings.wsize,
            height: settings.hsize,
            font:settings.ffont,
            source: settings.jjson,
            embed_id: emdid
        })

        $('#' + emdid).css(
            "font-family", settings.ffont + " !important"
        );

        //$('.slider-item .hyphenate').text();

        // var contents = $('#' + emdid + ".container p").text();

    };

    //////////////////////////////////////////////////////

    $.fn.compatible = function () {

        $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
// If the browser type if Mozilla Firefox
        if ($.browser.mozilla && $.browser.version >= "1.8") {
            return true;
        }
// If the browser type is Opera
        if ($.browser.opera) {
            return true;
        }

        $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
// If the web browser type is Chrome
        if ($.browser.chrome) {
            return true;
        }

// If the web browser type is Safari
        if ($.browser.safari) {
            return true;
        }

//If the web browser type is Internet Explorer 10 and above

        if  (typeof document.createStyleSheet === 'undefined') {
            document.createStyleSheet = function () {
                return document.createElement('script');
            }
        }

        if(ieVersion()>10){
            ie_browser = true;
            return true;
        }

        alert('Your browser does not support the timeline view');
        return false;
    }
    ////////////////////////////////////////////////////////////
})
(jQuery);