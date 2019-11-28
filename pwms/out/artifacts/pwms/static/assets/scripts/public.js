/*$("#statisMonthInput").on("click", function (e) {
    $("#lq-datetimepick > div.select-datetime > dl:nth-child(2)").hidden;
    $("#lq-datetimepick > div.select-datetime > dl:nth-child(3)").hidden;
    e.stopPropagation();
    $(this).lqdatetimepicker({
        dateType: 'D',
        offset: {
            left: 0, //向左偏移的位置
            top: 10 //向上偏移的位置
        },
        date: {
            'H' : {
                begin : '8:00', //开始时分
                end : '23:30', //结束时分
                step : "30" //时分步长
            },
            'D' : {
                month : new Date(), //日期默认时间
                selected : (new Date()).getDate()
            },
            'M' : {
                begin : 1, //月份开始
                end : (new Date()).getMonth()+1 , //月份结束
                selected : (new Date()).getMonth()+1  //月份初始
            },
            'Y' : {
                begin : 2018, //年份开始
                end : (new Date()).getFullYear(), //年份结束
                selected : (new Date()).getFullYear() //年份初始
            }
        },
        selectback: function () {
            Date.prototype.Format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            var selectTime=new Date($("#statisMonthInput").val());
            $("#statisMonthInput").val(selectTime.Format("yyyy-MM"));
        }
    });
});*/

$(".lable-year").click(function () {
    $('.event_year>li').removeClass('current');
    $(this).parent('li').addClass('current');
    var year = $(this).attr('for');
    $('#' + year).parent().prevAll('div').slideUp(800);
    $('#' + year).parent().slideDown(800).nextAll('div').slideDown(800);
});
