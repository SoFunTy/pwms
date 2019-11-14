


$("#nnoticesDate").on("click", function (e) {
    e.stopPropagation();
    $(this).lqdatetimepicker({
        css: 'datetime-day',
        dateType: 'D',
        selectback: function () {
        }
    });
});
$("#ptdatetimepicker3").on("click", function (e) {
    e.stopPropagation();
    $(this).lqdatetimepicker({
        css: 'datetime-day',
        dateType: 'D',
        selectback: function () {
        }
    });
});
$("#pdatetimepicker3").on("click", function (e) {
    e.stopPropagation();
    $(this).lqdatetimepicker({
        css: 'datetime-day',
        dateType: 'D',
        selectback: function () {
        }
    });
});
$("#datetimepicker3").on("click", function (e) {
    e.stopPropagation();
    $(this).lqdatetimepicker({
        css: 'datetime-day',
        dateType: 'D',
        selectback: function () {
        }
    });
});
$(".lable-year").click(function () {
    $('.event_year>li').removeClass('current');
    $(this).parent('li').addClass('current');
    var year = $(this).attr('for');
    $('#' + year).parent().prevAll('div').slideUp(800);
    $('#' + year).parent().slideDown(800).nextAll('div').slideDown(800);
});