var mydata = "";
// var baseUrl = "http://ad.pwms.xyz/";
var baseUrl = "http://localhost:8080/pwms/";
/*数据表格对象以及临时数据保存对象*/
var empTable;
var ndata = "";
var wageTable;
var wdata = "";
var staffTable;
var sdata = "";
var depTable;
var posTable;
var noticeTable;
var nodate;

if (localStorage.getItem("pwmsToken") === null){
    window.location.href = baseUrl;
}

$.ajax({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
    },
    type: "POST",
    url: baseUrl + "user/qby",
    dataType: "json",
    async: false,
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({"employeeId":localStorage.getItem("pwmsempId")}),
    success: function (result) {
        if (result.resultCode === 200) {
            mydata = result.data;
            localStorage.setItem("mydata",mydata)
        }
    },
    error: function () {
        showError("后台错误，请联系管理员！");
    }
});

setData();
userTypeCheck(mydata.permission.dicValue);

/**
 * description: 根据权限显示对于模块
 * 权限等级 3<2<1
 * @params a 等级
 */
function userTypeCheck(a) {
    $("#amin_index").attr("hidden","hidden")
    switch (a) {
        case "3":
            $("li[name*='common']").css("display", "block");
            break;
        case "2":
            $("li[name*='checker']").css("display", "block");
            break;
        case "1":
            $("li[name*='admin']").css("display", "block");
            $("#amin_index").removeAttr("hidden");
            break;
        default:
            break;
    }
    $("div[name*='admin']").css("display", "none");
    $("div[name*='index']").css("display", "block")
}

/*登出*/
function logout() {
    localStorage.removeItem('mydata');
    localStorage.removeItem('pwmsToken');
    localStorage.removeItem('pwmsempId');
    window.location.href = baseUrl;
}

$("#index").on("click",function () {
    setData()
})
$("#personnel_management_all").on("click", function () {
    setempTable()
});
// $("#personnel_management_single").one("click", function () {
//     if (ndata === "") {
//         record(mydata.employeeId)
//     }
// });
$("#departmental_wage").one("click", function () {
    setStatistics()
});
$("#personnel_department_management").on("click", function () {
    setDepartment()
});
$("#personnel_position_management").on("click", function () {
    setPositions()
});
$("#noticmanagerment").on("click", function () {
    setNoticesList()
});
$("#staff_induction").on("click", function () {
    setstaffTable()
});
$("#wage_enquiry").one("click", function () {
    setLastWages()
});
$("#reward_and_penalty").one("click", function () {
    setRap()
});
$("#account").on("click", function () {
    setDataInto()
});
$("#notice").on("click", function () {
    setNotices()
});
$("#staff_salary_enquiry").on("click", function () {
    setwagesTable()
});
$("#flow_bill").one("click", function () {
    setFlowBill()
});
$("#export_wage_table").on("click", function () {
    setwageTable()
});


/*统计*/
var myChart1, myChart2;

function setStatistics() {
    var timeYm = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    $("#statisMonthInput").val(timeYm);
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "statis/sTheYear",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            if (result.resultCode === 200) {
                var departmentName = [];
                var total = [];
                var i = 0;
                $.each(result.data, function () {
                    departmentName[i] = this.departmentName;
                    total[i++] = this.total;
                });
                myChart1 = new Chart($("#myline-chart"), {
                    type: 'bar',
                    data: {
                        labels: departmentName,
                        datasets: [{
                            label: '工资总和',
                            data: total,
                            backgroundColor: [
                                'rgba(255,184,184,0.8)'
                            ],
                            borderColor: [
                                'rgb(195,57,255)',
                                'rgb(21,255,51)',
                                'rgb(11,151,255)',
                                'rgb(255,120,23)'
                            ],
                            borderWidth: 3
                        }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "statis/sTheMonth",
        dataType: "json",
        data: JSON.stringify({"ntime": new Date()}),
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            if (result.resultCode === 200) {
                var departmentName = [];
                var total = [];
                var i = 0;
                $.each(result.data, function () {
                    departmentName[i] = this.departmentName;
                    total[i++] = this.total;
                });
                myChart2 = new Chart($("#mypie-chart"), {
                    type: 'pie',
                    data: {
                        labels: departmentName,
                        datasets: [{
                            label: '工资总和',
                            data: total,
                            backgroundColor: [
                                'rgb(220,160,255)',
                                'rgb(127,255,116)',
                                'rgb(100,190,255)',
                                'rgb(255,172,108)'
                            ],
                            borderWidth: 3
                        }
                        ]
                    }
                });
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
    /*添加年月option选项*/
    for (var i = 2019; i <= new Date().getFullYear(); i++) {
        $("#statisYearInput").append("<option value='" + i + "'>" + i + "</option>");
    }
    for (var i = 1; i <= new Date().getMonth() + 1; i++) {
        $("#statisMonthInput").append("<option value='" + i + "'>" + i + "</option>");
    }
    $("#statisYearInput > option[value='" + new Date().getFullYear() + "']").attr("selected", "selected");
    $("#statisMonthInput > option[value='" + (new Date().getMonth() + 1) + "']").attr("selected", "selected");
}

/*刷新月工资统计饼图*/
$("#statisYearInput").on("change", function () {
    myChart2Change()
});
$("#statisMonthInput").on("change", function () {
    myChart2Change()
});

function myChart2Change() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "statis/sTheMonth",
        dataType: "json",
        data: JSON.stringify({"ntime": ($("#statisYearInput").val() + "-" + $("#statisMonthInput").val() + "-01")}),
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            if (result.resultCode === 200) {
                myChart2.clear();
                if (result.data.length === 0) {
                    showError("无此记录");
                    return;
                }
                var departmentName = [];
                var total = [];
                var i = 0;
                $.each(result.data, function () {
                    departmentName[i] = this.departmentName;
                    total[i++] = this.total;
                });
                myChart2 = new Chart($("#mypie-chart"), {
                    type: 'pie',
                    data: {
                        labels: departmentName,
                        datasets: [{
                            label: '工资总和',
                            data: total,
                            backgroundColor: [
                                'rgb(220,160,255)',
                                'rgb(127,255,116)',
                                'rgb(100,190,255)',
                                'rgb(255,172,108)'
                            ],
                            borderWidth: 3
                        }
                        ]
                    }
                });
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
}

/*职位管理*/
function setPositions() {
    posTable = $('#positionList').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "pos/qal",
            "type": "POST",
            "dataSrc": "data"
        },
        "columns": [
            {"data": "positionId"},
            {
                "data": "departmentId.departmentName"
            },
            {
                "data": "positionName",
                "orderable": false
            },
            {
                "data": "positionBasePay"
            },
            {
                "data": "positionId",
                "orderable": false,
                "mRender": function (data, type, full) {
                    var posData = [full.positionId,full.departmentId.departmentId,"\"" + full.positionName + "\"",full.positionBasePay];
                    return "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-info' data-toggle='modal' data-target='#positionChange' onclick='posChange(" + posData + ")'>修改</button>" +
                        "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-info btn-outline-danger ml-2' data-toggle='modal' data-target='.confirm' onclick='posDel(" + data + ")'>删除</button>";
                }
            }
        ]
    });
    $("select[name='posDep']").empty();
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dep/qal",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({}),
        success: function (result) {
            if (result.resultCode === 200) {
                var natdata = result.data;
                for (i = 0; i < natdata.length; i++) {
                    var option = "<option value = '" + natdata[i].departmentId + "'>" + natdata[i].departmentName + "</option>";
                    $("select[name='posDep']").append(option);
                }
            }
        }
    });
}

function posDel(a) {
    Swal.fire({
        title: '确定删除?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确认'
    }).then((result) => {
        if (result.value) {
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            type: "POST",//方法类型
            url: baseUrl + "pos/del",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({"positionId": a}),
            success: function (result) {
                if (result.resultCode === 200) {
                    showSuccess("删除成功！");
                    posTable.ajax.reload(null, false);
                } else {
                    showError(result.message)
                }
            },
            error: function () {
                showError("后台错误，请联系管理员！");
            }
        });
    }
})
}
var posStatu = 0;
function posChange() {
    $("#posId").val(arguments[0]);
    $("select[name='posDep'] > option[value='" + arguments[1] + "']").attr("selected", "selected");
    $("#posName").val(arguments[2]);
    $("#posPay").val(arguments[3]);
    posStatu = 1;
}
function posreload() {
    $("#posId").val("");
    $("select[name='posDep']").removeAttr("selected");
    $("#posName").val("");
    $("#posPay").val("");
    posStatu = 0;
}
function posSave() {
    var posData = "";
    var posUrl = "";
    if (posStatu === 0){
        if ($("select[name='posDep']").val() === "" || $("#posName").val() === "" || $("#posPay").val() === ""){
            showError("请输入正确内容！");
            return;
        }
        posUrl = "pos/ins";
        posData = {
            "departmentId" : $("select[name='posDep']").val(),
            "positionName" : $("#posName").val(),
            "positionBasePay" : $("#posPay").val()
        }
    }else{
        posUrl = "pos/up";
        posData = {
            "positionId" : $("#posId").val(),
            "departmentId" : $("select[name='posDep']").val(),
            "positionName" : $("#posName").val(),
            "positionBasePay" : $("#posPay").val()
        }
    }
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + posUrl,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(posData),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功");
                posTable.ajax.reload(null, false);
                $("#positionChange > div > div > div.modal-footer > button.btn.btn-secondary").click();
            }
        }
    });
}


/*
* 公告管理
* 预留（使用wangEditer富文本编辑对公告进行编辑）*/
function setNoticesList() {
    noticeTable = $('#noticeList').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "notice/qal",
            "type": "POST",
            "dataSrc": "data"
        },
        "bAutoWidth": true,
        "columns": [
            {"data": "noticesId"},
            {"data": "noticesDate"},
            {
                "data": "notices",
                "orderable": false
            },
            {
                "data": "state"
            },
            {
                "data": "noticesId",
                "orderable": false,
                "mRender": function (data, type, full) {
                    return "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-info' data-toggle='modal' data-target='.noticeChange' onclick='noticeChange(" + data + ")'>修改</button>" +
                        "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-info btn-outline-danger ml-2' data-toggle='modal' data-target='.confirm' onclick='noticeDel(" + data + ")'>删除</button>";
                }
            }
        ]
    })
}

/*公告模态框设值*/
function noticeChange(a) {
    var myDate = new Date;
    var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;
    var date = myDate.getDate();
    $("select[name='nstate'] > options[selected='selected']").removeAttr("selected")
    if (a !== "0")
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            type: "POST",//方法类型
            url: baseUrl + "notice/qli",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({"noticesId": a}),
            success: function (result) {
                if (result.resultCode === 200) {
                    var ndata = result.data[0];
                    nodate = ndata.noticesId;
                    $("#nnoticesDate").val(ndata.noticesDate);
                    $("select[name='nstate'] > option[value='" + ndata.state + "']").attr("selected", "selected");
                    $("#nnotices").val(ndata.notices);
                    $("#nnoticesDate").removeAttr("readonly");
                    $("#nnoticesDate").on("click", function (e) {
                        e.stopPropagation();
                        $(this).lqdatetimepicker({
                            css: 'datetime-day',
                            dateType: 'D',
                            selectback: function () {
                            }
                        });
                    });
                }
            }
        });
    else {
        $("#nnoticesDate").on("click", function (e) {});
        $("#nnoticesDate").attr("readonly","readonly");
        $("#nnoticesDate").val(year + "-" + mon + "-" + date);
        $("select[name='nstate'] > option[value='待发布']").attr("selected", "selected");
        $("#nnotices").val("");
    }
}

/*公告删除*/
function noticeDel(a) {
    Swal.fire({
        title: '确定删除?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确认'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
                },
                type: "POST",//方法类型
                url: baseUrl + "notice/del",
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({"noticesId": a}),
                success: function (result) {
                    if (result.resultCode === 200) {
                        showSuccess("删除成功！");
                        noticeTable.ajax.reload(null, false);
                    } else {
                        showError(result.message)
                    }
                },
                error: function () {
                    showError("后台错误，请联系管理员！");
                }
            });
        }
    })
}

/*公告保存*/
function noticeSave() {
    var url = baseUrl + "notice/up";
    var data;
    if ($("#nnoticesDate").attr("readonly") === "readonly") {
        url = baseUrl + "notice/ins";
        data = {
            "noticesDate": $("#nnoticesDate").val(),
            "notices": $("#nnotices").val(),
            "state": $("select[name='nstate']").val()
        };
    } else {
        data = {
            "noticesId": nodate,
            "noticesDate": $("#nnoticesDate").val(),
            "notices": $("#nnotices").val(),
            "state": $("select[name='nstate']").val()
        };
    }
    if (data.notices === ""){
        showError("请输入公告内容！");
        return;
    }
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: url,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功！");
                noticeTable.ajax.reload(null, false);
            } else {
                showError(result.message)
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
    $("button[data-dismiss='modal']").click();
}

/**
 * description: 数据加载
 */
function setData() {
    //在职情况
    setInJob();
    //主页工资
    setIndexWages();
    //主页公告
    setNewNotice();
    //select选项加载
    setNatOption();
    setAdd1Option();
    setHeadicon()
}

/*头像设置*/
function headicon(a) {
    $("div[class*='header-icons'] > div").attr("class", "bavat");
    $(a).attr("class", "bavatcheak")
}

/*头像初始设置*/
function setHeadicon() {
    $("div.app-header__content > div > div > div > div > div:nth-child(1) > div > a > div").attr("class", "rounded-circle avat avatar" + mydata.headIcon + " float-left");
    $("div[name='" + mydata.headIcon + "']").attr("class", "bavatcheak");
    $("div[class*='employee-name']").html(mydata.employeeName);
    $("div[class*='employee-position']").html(mydata.positionId.positionName);
}


/*
*查询上月工资奖罚信息*/
function setLastWages() {
    var myDate = new Date;
    var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var data = {
        "employeeId": mydata.employeeId,
        "recodingTime": year + "-" + mon + "-" + date
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "wage/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": mydata.employeeId, "releaseTime": year + "-" + mon + "-" + date}),
        success: function (result) {
            if (result.resultCode === 200) {
                if (result.data.length !== 0) {
                    var thisdata = result.data[0];
                    $("#LastMWages1").html("￥ " + thisdata.basePay);
                    $("#LastMWages2").html("￥ " + thisdata.postWage);
                    $("#LastMWages3").html("￥ " + thisdata.jxw);
                    $("#LastMWages4").html("￥ " + thisdata.allowance);
                    $("#LastMWages5").html("￥ " + thisdata.bouns);
                    $("#LastMWages6").html("￥ " + thisdata.penalty);
                    $("#LastMWages7").html("￥ " + thisdata.eInsurance);
                    $("#LastMWages8").html("￥ " + thisdata.iInsurance);
                    $("#LastMWages9").html("￥ " + thisdata.uInsurance);
                    $("#LastMWages10").html("￥ " + thisdata.wInsurance);
                    $("#LastMWages11").html("￥ " + thisdata.mInsurance);
                    $("#LastMWages12").html("￥ " + thisdata.housingFund);
                    $("#LastMWages13").html("￥ " + thisdata.iitFeelsCold);
                } else {
                    $("#LastMWages1").html("￥ 0");
                    $("#LastMWages2").html("￥ 0");
                    $("#LastMWages3").html("￥ 0");
                    $("#LastMWages4").html("￥ 0");
                    $("#LastMWages5").html("￥ 0");
                    $("#LastMWages6").html("￥ 0");
                    $("#LastMWages7").html("￥ 0");
                    $("#LastMWages8").html("￥ 0");
                    $("#LastMWages9").html("￥ 0");
                    $("#LastMWages10").html("￥ 0");
                    $("#LastMWages11").html("￥ 0");
                    $("#LastMWages12").html("￥ 0");
                    $("#LastMWages13").html("￥ 0");
                }
            }
        }
    });
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "rap/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                if (result.data.length === 0) {
                    $("div.app-main__outer > div > div:nth-child(15) > div:nth-child(3)").append("" +
                        "                       <div class='col-md-6 col-xl-3'>" +
                        "                            <div class='card mb-3 widget-content bg-success'>" +
                        "                                <div class='widget-content-wrapper text-white'>" +
                        "                                    <div class='widget-content-left'>" +
                        "                                        <div class='widget-heading'>奖励</div>" +
                        "                                    </div>" +
                        "                                    <div class='widget-content-right'>" +
                        "                                        <div class='widget-numbers text-white'><span>￥ 0</span></div>" +
                        "                                    </div>" +
                        "                                </div>" +
                        "                            </div>" +
                        "                        </div>" +
                        "                        <div class='col-md-6 col-xl-3'>\n" +
                        "                            <div class='card mb-3 widget-content bg-danger'>" +
                        "                                <div class='widget-content-wrapper text-white'>" +
                        "                                    <div class='widget-content-left'>" +
                        "                                        <div class='widget-heading'>罚扣</div>" +
                        "                                    </div>" +
                        "                                    <div class='widget-content-right'>\n" +
                        "                                        <div class='widget-numbers text-white'><span>￥ 0</span></div>" +
                        "                                    </div>" +
                        "                                </div>" +
                        "                            </div>" +
                        "                        </div>")
                }
                var resdata = result.data;
                for (var i = 0; i < result.data.length; i++) {
                    if (resdata[i].reward !== 0) {
                        $("div.app-main__outer > div > div:nth-child(15) > div:nth-child(3)").append(" " +
                            "                       <div class='col-md-6 col-xl-3'>" +
                            "                           <div class='widget-content-wrapper text-white' data-toggle='tooltip' data-placement='top' title='' data-original-title='时间：" + resdata[i].recodingTime + "              备注：" + resdata[i].information + "'>" +
                            "                               <div class='card mb-3 widget-content bg-success'>" +
                            "                                    <div class='widget-content-left'>" +
                            "                                        <div class='widget-heading'>奖励</div>" +
                            "                                    </div>" +
                            "                                    <div class='widget-content-right'>" +
                            "                                        <div class='widget-numbers text-white'><span>￥ " + resdata[i].reward + "</span></div>" +
                            "                                    </div>" +
                            "                                </div>" +
                            "                            </div>" +
                            "                        </div>");
                    } else {
                        $("div.app-main__outer > div > div:nth-child(15) > div:nth-child(3)").append("" +
                            "                       <div class='col-md-6 col-xl-3'>" +
                            "                            <div class='card mb-3 widget-content bg-danger'>" +
                            "                                <div class='widget-content-wrapper text-white' data-toggle='tooltip' data-placement='top' title='' data-original-title='时间：" + resdata[i].recodingTime + "              备注：" + resdata[i].information + "'>" +
                            "                                    <div class='widget-content-left'>" +
                            "                                        <div class='widget-heading'>罚扣</div>" +
                            "                                    </div>" +
                            "                                    <div class='widget-content-right'>" +
                            "                                        <div class='widget-numbers text-white'><span>￥ " + resdata[i].punishment + "</span></div>" +
                            "                                    </div>" +
                            "                                </div>" +
                            "                            </div>" +
                            "                        </div>");
                    }
                }
                loadJs();
            }
        }
    });
}

/*
* 奖罚查询*/
function setRap() {
    var data = {
        "employeeId": mydata.employeeId
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "rap/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                if (result.data.length !== 0) {
                    var resdata = result.data;
                    var ntime = resdata[0].recodingTime;
                    for (var i = 0; i < result.data.length; i++) {
                        if (resdata[i].reward !== 0) {
                            if (ntime.substr(0, 7) !== resdata[i].recodingTime.substr(0, 7)) {
                                $("div.reward_and_penalty.row").append("<div class='col-lg-12 mt-4 col-xl-12'></div>");
                            } else {
                                ntime = resdata[i].recodingTime
                            }
                            $("div.reward_and_penalty.row").append("" +
                                "                       <div class='col-lg-6 col-xl-4'>" +
                                "                            <div class='card mb-3 widget-content'>" +
                                "                                <div class='widget-content-wrapper'>" +
                                "                                    <div class='widget-content-left'>" +
                                "                                        <div class='widget-heading'><font style='vertical-align: inherit;'><font\n" +
                                "                                                style='vertical-align: inherit;'>时间：" + resdata[i].recodingTime + "</font></font></div>" +
                                "                                        <div class='widget-subheading'>" +
                                "                                           <font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>奖励</font ></font></div>" +
                                "                                    </div>" +
                                "                                    <div class='widget-content-right'>" +
                                "                                        <div class='widget-numbers text-success'><span><font" +
                                "                                                style='vertical-align: inherit;'><font style='vertical-align: inherit;'>" + resdata[i].reward + "</font></font></span>" +
                                "                                        </div>" +
                                "                                    </div>" +
                                "                                </div>" +
                                "                            </div>" +
                                "                        </div>");
                        } else if (resdata[i].punishment !== 0) {
                            $("div.reward_and_penalty.row").append("" +
                                "                       <div class='col-lg-6 col-xl-4'>" +
                                "                            <div class='card mb-3 widget-content'>" +
                                "                                <div class='widget-content-wrapper'>" +
                                "                                    <div class='widget-content-left'>" +
                                "                                        <div class='widget-heading'><font style='vertical-align: inherit;'><font\n" +
                                "                                                style='vertical-align: inherit;'>时间：" + resdata[i].recodingTime + "</font></font></div>" +
                                "                                        <div class='widget-subheading'>" +
                                "                                           <font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>罚扣</font ></font></div>" +
                                "                                    </div>" +
                                "                                    <div class='widget-content-right'>" +
                                "                                        <div class='widget-numbers text-danger'><span><font" +
                                "                                                style='vertical-align: inherit;'><font style='vertical-align: inherit;'>" + resdata[i].punishment + "</font></font></span>" +
                                "                                        </div>" +
                                "                                    </div>" +
                                "                                </div>" +
                                "                            </div>" +
                                "                        </div>");
                        }
                    }
                } else {
                    $("div.reward_and_penalty.row").append("" +
                        "                       <div class='col-md-6 col-xl-3'>" +
                        "                            <div class='card mb-3 widget-content bg-success'>" +
                        "                                <div class='widget-content-wrapper text-white'>" +
                        "                                    <div class='widget-content-left'>" +
                        "                                        <div class='widget-heading'>奖励</div>" +
                        "                                    </div>" +
                        "                                    <div class='widget-content-right'>" +
                        "                                        <div class='widget-numbers text-white'><span>￥ 0</span></div>" +
                        "                                    </div>" +
                        "                                </div>" +
                        "                            </div>" +
                        "                        </div>" +
                        "                        <div class='col-md-6 col-xl-3'>\n" +
                        "                            <div class='card mb-3 widget-content bg-danger'>" +
                        "                                <div class='widget-content-wrapper text-white'>" +
                        "                                    <div class='widget-content-left'>" +
                        "                                        <div class='widget-heading'>罚扣</div>" +
                        "                                    </div>" +
                        "                                    <div class='widget-content-right'>\n" +
                        "                                        <div class='widget-numbers text-white'><span>￥ 0</span></div>" +
                        "                                    </div>" +
                        "                                </div>" +
                        "                            </div>" +
                        "                        </div>")
                }
            }
        }
    });
}

/*
* 重加载js，绑定tip事件*/
function loadJs() {
    // $.getScript('../assets/scripts/main.js');
}

/*
* 账号密码设置*/
function checkAValid(a) {
    if ($(a).val() !== "" || $(a).val().length > 4) {
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            type: "POST",
            url: baseUrl + "user/qbyname",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            async: false,
            data: JSON.stringify({"employeeId": $(a).val()}),
            success: function (result) {
                if (result.resultCode === 200 || result.data !== "") {
                    $("#aemployeeName").val(result.data);
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "user/qbyemail",
                        dataType: "json",
                        contentType: "application/json;charset=UTF-8",
                        data: JSON.stringify({"employeeId": $(a).val()}),
                        success: function (result) {
                            $("input[name='aemail']").val(result.data);
                        }
                    });
                    $("#accbtn").removeAttr("disabled")
                }
                if (result.resultCode === 408) {
                    $("#aemployeeName").val("");
                    $("#aemail").val("");
                    $("#accbtn").attr("disabled", "disabled")
                }
            }
        });
    }
}

function acctReset() {
    var data = {
        "employeeId": $("#aemployeeId").val(),
        "epassword": $("#aepassword").val()
    };
    if (data.epassword === "密码"){
        showError("请输入密码！");
        return;
    }else if (data.epassword.length < 6){
        showError("密码需大于6位！");
        return;
    }
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "user/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("修改成功");
                $("button[name='accReset']").click()
            }
        }
    });
}

/*
* 奖罚输入
* */
function checkValid(a) {
    if ($(a).val() !== "" || $(a).val().length > 5) {
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            type: "POST",
            url: baseUrl + "user/qbyname",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({"employeeId": $(a).val()}),
            success: function (result) {
                if (result.resultCode === 200 || result.data !== "") {
                    $("#cemployeeName").val(result.data);
                    $("#ampbtn").removeAttr("disabled")
                }
                if (result.resultCode === 408) {
                    $("#cemployeeName").val("");
                    $("#ampbtn").attr("disabled", "disabled")
                }
            }
        });
    }
}

/*
* 奖罚添加*/
function ampAdd() {
    var reward = 0;
    var punishment = 0;
    if ($("input:radio[name='customRadio']:checked").val() === "reward") {
        reward = $("input[name='cnumber']").val();
    }
    if ($("input:radio[name='customRadio']:checked").val() === "punishment") {
        punishment = $("input[name='cnumber']").val();
    }
    var myDate = new Date;
    var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var data = {
        "employeeId": $("#cemployeeId").val(),
        "recodingTime": year + "-" + mon + "-" + date,
        "information": $("#einfo").val(),
        "reward": reward,
        "punishment": punishment
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "rap/ins",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("添加成功");
                $("button[name='ampReset']").click()
            }
        }
    });
}

/*设置在职情况*/
function setInJob() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "statis/sInJob",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            if (result.data !== null) {
                $("#waitJob").html(result.data[1].num);
                $("#inJob").html(result.data[0].num);
            }
        }
    });
}

/*
*设置主页工资信息*/
function setIndexWages() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "wage/qmy",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": mydata.employeeId}),
        success: function (result) {
            if (result.data !== null) {
                $("#lastMWage").html("￥ " + result.data.wageDeductedTax);
                $("span[name='LastMWages']").html("￥ " + result.data.wageDeductedTax);
                $("#lastMWageA").html("￥ " + result.data.bouns);
                $("#lastMWageB").html("￥ " + result.data.penalty)
            } else {
                $("#lastMWage").html("￥ 0");
                $("span[name='LastMWages']").html("￥ 0");
                $("#lastMWageA").html("￥ 0");
                $("#lastMWageB").html("￥ 0")
            }
        }
    });
}

/*
*设置主页公告信息*/
function setNewNotice() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "notice/qne",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (result) {
            if (result.resultCode === 200) {
                $("#indexNoticeTime").html(result.data.noticesDate);
                $("#indexNotice").html(result.data.notices)
            }
        }
    });
}

/*
*账号管理数据填入*/
function setDataInto() {
    $("label[name='employeeId']").html(mydata.employeeId);
    $("label[name='positionId']").html(mydata.positionId.positionName);
    $("label[name='oinTime']").html(mydata.oinTime);
    $("input[name='email']").val(mydata.email);
    $("input[name='epassword']").val(mydata.epassword);
    $("input[name='employeeName']").val(mydata.employeeName);
    if (mydata.sex != null)
        $("select[name='sex']").find("option:contains('" + mydata.sex.dicValue + "')").attr("selected", "selected");
    if (mydata.age != null)
        $("input[name='age']").val(mydata.age);
    if (mydata.pol != null)
        $("select[name='pol'] > option[value='" + mydata.pol.dicId + "']").attr("selected", "selected");
    if (mydata.brith != null)
        $("input[name='brith']").val(mydata.brith);
    if (mydata.idNumber != null)
        $("input[name='idNumber']").val(mydata.idNumber);
    if (mydata.education != null)
        $("select[name='education'] > option[value='" + mydata.education.dicId + "']").attr("selected", "selected");
    if (mydata.university != null)
        $("input[name='university']").val(mydata.university);
    if (mydata.major != null)
        $("input[name='major']").val(mydata.major);
    if (mydata.homeNote != null)
        $("input[name='homeNote']").val(mydata.homeNote);
    if (mydata.phone != null)
        $("input[name='phone']").val(mydata.phone);
    if (mydata.marriage != null)
        $("select[name='marriage'] > option[value='" + mydata.marriage.dicId + "']").attr("selected", "selected");
    if (mydata.health != null)
        $("select[name='health'] > option[value='" + mydata.health.dicId + "']").attr("selected", "selected");
    if (mydata.bloodType != null)
        $("select[name='bloodType'] > option[value='" + mydata.bloodType.dicId + "']").attr("selected", "selected");
    if (mydata.note != null)
        $("textarea[name='note']").val(mydata.note)
}

/*
*初始化数据从加载*/
function onloadSet() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "user/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        async: false,
        data: JSON.stringify({"employeeId": mydata.employeeId}),
        success: function (result) {
            if (result.resultCode === 200) {
                mydata = result.data;
                localStorage.setItem('mydata', JSON.stringify(result.data));
                setData();
            }
        }
    });
}

/*
* 加载公告页内容
* */
function setNotices() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "notice/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"state": "已发布", "num": 5}),
        success: function (result) {
            if (result.resultCode === 200) {
                for (var i = 1; i <= 5; i++) {
                    $("h5[name=notices" + i + "]").html(result.data[i - 1].noticesDate);
                    $("p[name=notices" + i + "]").html(result.data[i - 1].notices);
                }
            }
        }
    });
}

/*
* 员工花名册
* */
function setempTable() {
    empTable = $('#employeeList').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "user/qal",
            "dataType": "json",
            "data": JSON.stringify({}),
            "type": "POST",
            "dataSrc": "data"
        },
        "order": [[1, "desc"]],
        "columns": [
            {
                "data": "employeeName",
                "class": "fc-1",
                "orderable": false
            },
            {
                "data": "employeeId"
            },
            {
                "data": "positionId.departmentId.departmentName"
            },
            {
                "data": "positionId.positionName",
                "orderable": false
            },
            {
                "data": "idNumber",
                "orderable": false
            },
            {
                "data": "phone",
                "orderable": false
            },
            {
                "data": "oinTime"
            },
            {
                "data": "sex.dicValue"
            },
            {
                "data": "employeeId",
                "orderable": false,
                "mRender": function (data, type, full) {
                    return "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-secondary' onclick='record(" + data + ")'>查看详情</button>";
                }
            }
        ]
    })
}

/*
* 员工档案
* */
function record(a) {
    $("div.app-sidebar__inner.mt-2 > ul > li.mm-active > ul > li:nth-child(2) > a").click();
    $(":input", "div.app-main__outer > div > div:nth-child(5) > div > div > div > div > div > form")
        .not(":button", ":reset", "hidden", "submit")
        .removeAttr("checked")
        .removeAttr("selected");
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "user/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": a}),
        success: function (result) {
            if (result.resultCode === 200) {
                ndata = result.data;
                $("label[name='pemployeeId']").html(ndata.employeeId);
                setPosition();
                $("input[name='poinTime']").val(ndata.oinTime);
                if (ndata.permission !== null)
                    $("select[name='permission'] > option[value='" + ndata.permission.dicId + "']").attr("selected", "selected");
                $("input[name='pemail']").val(ndata.email);
                $("input[name='pepassword']").val(ndata.epassword);
                $("input[name='pemployeeName']").val(ndata.employeeName);
                if (ndata.sex.dicValue !== null)
                    $("select[name='psex']").find("option:contains('" + ndata.sex.dicValue + "')").attr("selected", "selected");
                if (ndata.age !== null)
                    $("input[name='page']").val(ndata.age);
                if (ndata.pol !== '')
                    if (ndata.pol.dicId !== null)
                        $("select[name='ppol'] > option[value='" + ndata.pol.dicId + "']").attr("selected", "selected");
                if (ndata.brith !== null)
                    $("input[name='pbrith']").val(ndata.brith);
                if (ndata.idNumber !== null)
                    $("input[name='pidNumber']").val(ndata.idNumber);
                if (ndata.education !== '')
                    if (ndata.education.dicId !== null)
                        $("select[name='peducation'] > option[value='" + ndata.education.dicId + "']").attr("selected", "selected");
                if (ndata.university !== null)
                    $("input[name='puniversity']").val(ndata.university);
                if (ndata.major !== null)
                    $("input[name='pmajor']").val(ndata.major);
                if (ndata.homeNote !== null)
                    $("input[name='phomeNote']").val(ndata.homeNote);
                if (ndata.phone !== null)
                    $("input[name='pphone']").val(ndata.phone);
                if (ndata.marriage !== '')
                    if (ndata.marriage.dicId !== null)
                        $("select[name='pmarriage'] > option[value='" + ndata.marriage.dicId + "']").attr("selected", "selected");
                if (ndata.health !== '')
                    if (ndata.health.dicId !== null)
                        $("select[name='phealth'] > option[value='" + ndata.health.dicId + "']").attr("selected", "selected");
                if (ndata.bloodType !== '')
                    if (ndata.bloodType.dicId !== null)
                        $("select[name='pbloodType'] > option[value='" + ndata.bloodType.dicId + "']").attr("selected", "selected");
                if (ndata.note !== null)
                    $("textarea[name='pnote']").val(ndata.note);
                setpNatOption();
                setpAdd1Option();
            }
        }
    });
}

/*动态加载职位select option*/
var nstaffId = 0;

function setPosition() {
    $("#staffList > tbody > tr > td:nth-child(1)").each(function () {
        if (parseInt($(this).html()) > nstaffId) nstaffId = parseInt($(this).html())
    });
    $("input[name='staffId']").val(parseInt(nstaffId) + 1);
    $("select[name='ppositionId']").empty();
    $("select[name='staffPos']").empty();
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "pos/qal",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({}),
        success: function (result) {
            if (result.resultCode === 200) {
                var natdata = result.data;
                for (i = 0; i < natdata.length; i++) {
                    var option = "<option value = '" + natdata[i].positionId + "'>" + natdata[i].positionName + "</option>";
                    $("select[name='ppositionId']").append(option);
                    $("select[name='staffPos']").append(option)
                }
                if (ndata !== "")
                    $("select[name='ppositionId'] > option[value='" + ndata.positionId.positionId + "']").attr("selected", "selected")
            }
        }
    });
}

/*动态加载民族select option*/
function setpNatOption() {
    $("#PNationnal").empty();
    $("#PNationnal").append("<option value = '3623'>请选择</option>");
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"dicNote": "民族"}),
        success: function (result) {
            if (result.resultCode === 200) {
                var natdata = result.data;
                for (i = 0; i < natdata.length; i++) {
                    var option = "<option value = '" + natdata[i].dicId + "'>" + natdata[i].dicValue + "</option>";
                    $("#PNationnal").append(option)
                }
                if (ndata.nattional != null)
                    $("select[name='pnattional'] > option[value='" + ndata.nattional.dicId + "']").attr("selected", "selected")
            }
        }
    });
}

/*添加省的select中option*/
function setpAdd1Option() {
    $("#PHome_Address01").empty();
    $("#PHome_Address02").empty();
    $("#PHome_Address03").empty();
    $("#PNatives01").empty();
    $("#PNatives01").append("<option name='7101' value = '3568'>请选择</option>");
    $("#PHome_Address01").append("<option name='7101' value = '3568'>请选择</option>");
    $("#PHome_Address02").append("<option name='7101' value = '3568'>请选择</option>");
    $("#PHome_Address03").append("<option name='7101' value = '3568'>请选择</option>");
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"dicRelation": "0"}),
        success: function (result) {
            if (result.resultCode === 200) {
                var add1data = result.data;
                for (i = 0; i < add1data.length; i++) {
                    var option = "<option name='" + add1data[i].dicNote + "' value = '" + add1data[i].dicId + "'>" + add1data[i].dicValue + "</option>";
                    $("#PHome_Address01").append(option);
                    $("#PNatives01").append(option)
                }
            }
            if (ndata.natives01 != null)
                $("select[name='pnatives01'] > option[value='" + ndata.natives01.dicId + "']").attr("selected", "selected");
            if ($("select[name='pnatives01'] > option[value='" + ndata.natives01.dicId + "']").attr("selected") === "selected")
                $("select[name='pnatives01']").trigger('change');
            if (ndata.homeAddress1 != null)
                $("select[name='phomeAddress1'] > option[value='" + ndata.homeAddress1.dicId + "']").attr("selected", "selected");
            if ($("select[name='phomeAddress1'] > option[value='" + ndata.homeAddress1.dicId + "']").attr("selected") === "selected")
                $("select[name='phomeAddress1'] ").trigger('change');
        }
    });
}

/*住址二级联动*/
function setpAdd2Option(a) {
    $("#PHome_Address02").empty();
    $("#PHome_Address03").empty();
    $("#PHome_Address03").append("<option name='7101' value = '3568'>请选择</option>");
    $("#PHome_Address02").append("<option name='7101' value = '3568'>请选择</option>");
    if (a.selectedIndex == 0)
        return;
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                var add2data = result.data;
                for (i = 0; i < add2data.length; i++) {
                    var option = "<option name='" + add2data[i].dicNote + "'value = '" + add2data[i].dicId + "'>" + add2data[i].dicValue + "</option>";
                    $("#PHome_Address02").append(option)
                }
            }
            $("select[name='phomeAddress2'] > option[value='" + ndata.homeAddress2.dicId + "']").attr("selected", "selected");
            if ($("select[name='phomeAddress2'] > option[value='" + ndata.homeAddress2.dicId + "']").attr("selected") == "selected")
                $("select[name='phomeAddress2'] ").trigger('change');
        }
    });
}

function setpAdd3Option(a) {
    $("#PHome_Address03").empty();
    $("#PHome_Address03").append("<option name='7101' value = '3568'>请选择</option>");
    if (a.selectedIndex === 0)
        return;
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                var add3data = result.data;
                for (i = 0; i < add3data.length; i++) {
                    var option = "<option name='" + add3data[i].dicNote + "'value = '" + add3data[i].dicId + "'>" + add3data[i].dicValue + "</option>";
                    $("#PHome_Address03").append(option)
                }
            }
            $("select[name='phomeAddress3'] > option[value='" + ndata.homeAddress3.dicId + "']").attr("selected", "selected");
        }
    });
}

/*籍贯二级联动*/
function setpNatives02(a) {
    $("#PNatives02").empty();
    $("#PNatives02").append("<option name='7101' value = '3568'>请选择</option>");
    if (a.selectedIndex === 0)
        return;
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                var add1data = result.data;
                for (i = 0; i < add1data.length; i++) {
                    var option = "<option name='" + add1data[i].dicNote + "' value = '" + add1data[i].dicId + "'>" + add1data[i].dicValue + "</option>";
                    $("#PNatives02").append(option)
                }
                if (ndata.natives02 != null)
                    $("select[name='pnatives02'] > option[value='" + ndata.natives02.dicId + "']").attr("selected", "selected");
            }
        }
    });
}

/*
* 员工档案保存
* */
function setpEmployee() {
    var data = {
        "employeeId": ndata.employeeId,
        "permission": $("select[name='permission']").val(),
        "email": $("input[name='pemail']").val(),
        "epassword": $("input[name='pepassword']").val(),
        "employeeName": $("input[name='pemployeeName']").val(),
        "nattional": $("select[name='pnattional']").val(),
        "natives01": $("select[name='pnatives01']").val(),
        "natives02": $("select[name='pnatives02']").val(),
        "pol": $("select[name='ppol']").val(),
        "brith": $("input[name='pbrith']").val(),
        "idNumber": $("input[name='pidNumber']").val(),
        "education": $("select[name='peducation']").val(),
        "university": $("input[name='puniversity']").val(),
        "major": $("input[name='pmajor']").val(),
        "homeAddress1": $("select[name='phomeAddress1']").val(),
        "homeAddress2": $("select[name='phomeAddress2']").val(),
        "homeAddress3": $("select[name='phomeAddress3']").val(),
        "homeNote": $("input[name='phomeNote']").val(),
        "phone": $("input[name='pphone']").val(),
        "marriage": $("select[name='pmarriage']").val(),
        "health": $("select[name='phealth']").val(),
        "bloodType": $("select[name='pbloodType']").val(),
        "note": $("textarea[name='pnote']").val()
    };
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (data.email.length < 6 || !reg.test(data.email)){showError("请正确输入邮箱！");return;}
    if (data.epassword.length < 6){showError("请正确输入密码！");return;}
    if (data.employeeName.length === 0 || data.employeeName === "姓名"){showError("请正确输入姓名！");return;}
    if (data.idNumber.length !== 18){showError("请正确输入身份证号！");return;}
    if (data.phone.length !== 11){showError("请正确输入电话！");return;}
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "user/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功");
                onloadSet();
                record(ndata.employeeId);
                empTable.ajax.reload(null, false);
            }
        }
    });
}

/*部门管理模块*/

function setDepartment() {
    depTable = $('#departmentList').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "dep/qal",
            "type": "POST",
            "dataSrc": "data"
        },
        "columns": [
            {"data": "departmentId"},
            {
                "data": "departmentName",
                "orderable": false
            },
            {
                "data": "departmentCharge",
                "orderable": false
            },
            {
                "data": "departmentId",
                "orderable": false,
                "mRender": function (data, type, full) {
                    return "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-info' data-toggle='modal' data-target='#departmentChange' onclick='depChange(" + data + ")'>修改</button>" +
                        "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-info btn-outline-danger ml-2' data-toggle='modal' data-target='.confirm' onclick='depDel(" + data + ")'>删除</button>";
                }
            }
        ]
    })
}

var newDepId = 0;

function depreload() {
    $("#departmentList > tbody > tr > td.sorting_1").each(function () {
        if ($(this).html() > newDepId) newDepId = $(this).html()
    });
    $("input[name='depId']").val(parseInt(newDepId) + 1);
    $("input[name='depName']").val("");
    $("input[name='depChargeId']").val("");
}

function depChange(a) {
    newDepId = 0;
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dep/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"departmentId": a}),
        success: function (result) {
            if (result.resultCode === 200) {
                $("input[name='depId']").attr("readonly", "readonly");
                $("input[name='depId']").val(result.data.departmentId);
                $("input[name='depName']").val(result.data.departmentName);
                $("input[name='depChargeId']").val(result.data.departmentCharge)
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
}

function depDel(a) {
    Swal.fire({
        title: '确定删除?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确认'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
                },
                type: "POST",//方法类型
                url: baseUrl + "dep/del",
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({"departmentId": a}),
                success: function (result) {
                    if (result.resultCode === 200) {
                        showSuccess("删除成功！");
                        depTable.ajax.reload(null, false);
                    } else {
                        showError(result.message)
                    }
                },
                error: function () {
                    showError("后台错误，请联系管理员！");
                }
            });
        }
    })
}

function depSave() {
    var url = baseUrl + "dep/up";
    if (newDepId != 0) {
        url = baseUrl + "dep/ins";
    }
    if ($("input[name='depName']").val() === "") {
        showError("请输入部门名称");
        return;
    }
    nData = {
        "departmentId": $("input[name='depId']").val(),
        "departmentName": $("input[name='depName']").val(),
        "departmentCharge": $("input[name='depChargeId']").val()
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: url,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(nData),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功！");
                depTable.ajax.reload(null, false);
                $("button[data-dismiss='modal']").click();
            } else {
                showError(result.message)
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
}

/*
* 入职情况表
* */

/*
* 设置入职情况表*/
function setstaffTable() {
    staffTable = $('#staffList').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "user/qal",
            "dataType": "json",
            "data": JSON.stringify({}),
            "type": "POST",
            "dataSrc": "data"
        },
        "order": [[4, "desc"]],
        "columns": [
            {
                "data": "employeeId",
                "class": "fc-1"
            },
            {
                "data": "employeeName",
                "class": "fc-1",
                "orderable": false
            },
            {
                "data": "positionId.departmentId.departmentName"
            },
            {
                "data": "positionId.positionName",
                "orderable": false
            },
            {
                "data": "oinTime"
            },
            {
                "data": "elock.dicValue"
            },
            {
                "data": "employeeId",
                "orderable": false,
                "mRender": function (data, type, full) {
                    return "<button  type='button' class='mb-2 mr-2 border-0 btn-transition btn btn-outline-secondary' data-toggle='modal' data-target='#staffChange' onclick='srecord(" + data + ")'>修改入职情况</button>";
                }
            }
        ],
        "order": [[0, "desc"]]
    });
}

/*加载数据模态框*/
function srecord(a) {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "user/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": a}),
        success: function (result) {
            if (result.resultCode === 200) {
                sdata = result.data;
                $("select[name='seLock'] > option[value='" + sdata.elock.dicId + "']").attr("selected", "selected");
            }
        }
    });
}

/*
* 保存入职情况*/
function staffSave() {
    var data = {
        "employeeId": sdata.employeeId,
        "elock": $("select[name='seLock']").val()
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "user/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功");
                staffTable.ajax.reload(null, false);
                $("#staffChange > div > div > div.modal-header > button > span").click();
            }
        }
    });
}

/*
* 员工入职信息添加*/
function staffAdd() {
    if ($("input[name='staffName']").val() === "" || $("input[name='staffIdCard']").val().length !== 18 || $("input[name='staffEmail']").val() ===""){
        showError("请检查输入！");
        return;
    }
    var data = {
        "employeeId": $("input[name='staffId']").val(),
        "employeeName": $("input[name='staffName']").val(),
        "positionId": $("select[name='staffPos']").val(),
        "oinTime": $("input[name='staffTime']").val(),
        "idNumber": $("input[name='staffIdCard']").val(),
        "email": $("input[name='staffEmail']").val(),
        "epassword": $("input[name='staffPwd']").val()
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "user/ins",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 407) {
                showError("工号或者邮箱账号已存在，请重新输入！")
            }
            if (result.resultCode === 200) {
                showSuccess("保存成功");
                staffTable.ajax.reload(null, false);
                $("#staffAdd > div > div > div.modal-header > button > span").click();
            }
        }
    });
}
/*初始密碼*/
function setPasswd(a) {
    if ($(a).val().length === 18){
        $("#staffPwd").val($(a).val().substr(12,6));
    }
}

/*
* 员工工资表
* */
function setwagesTable() {
    wageTable = $('#wagesList').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "wage/qal",
            "dataType": "json",
            "type": "POST",
            "dataSrc": "data"
        },
        "columns": [
            {
                "data": "wagesId",
                "class": "fc-1  text-center"
            },
            {
                "data": "employeeId"
            },
            {
                "data": "employeeName",
                "orderable": false
            },
            {
                "data": "wageDeductedTax"
            },
            {
                "data": "releaseTime"
            },
            {
                "data": "basePay",
                "orderable": false
            },
            {
                "data": "postWage",
                "orderable": false
            },
            {
                "data": "jxw",
                "orderable": false
            },
            {
                "data": "allowance",
                "orderable": false
            },
            {
                "data": "bouns",
                "orderable": false
            },
            {
                "data": "penalty",
                "orderable": false
            },
            {
                "data": "eInsurance",
                "orderable": false
            },
            {
                "data": "iInsurance",
                "orderable": false
            },
            {
                "data": "uInsurance",
                "orderable": false
            },
            {
                "data": "wInsurance",
                "orderable": false
            },
            {
                "data": "mInsurance",
                "orderable": false
            },
            {
                "data": "housingFund",
                "orderable": false
            },
            {
                "data": "iitFeelsCold",
                "orderable": false
            },
            {
                "data": "wagesId",
                "orderable": false,
                "class": "text-center",
                "mRender": function (data, type, full) {
                    var wsreData = [full.employeeId,full.employeeName,full.jxw,full.allowance,full.bouns,full.penalty];
                    return "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-secondary' " +
                        "onclick='wrecord(" + data + "," + full.employeeId + ",\"" + full.employeeName + "\"," + full.jxw + "," + full.allowance + "," + full.bouns + "," + full.penalty + ")'>修改</button>";
                }
            }
        ],
        "processing": true,
        "autoWidth": true,
        "scrollX": true,//x方向滚动
        "scrollCollapse": true,
        "fixedColumns": {
            "leftColumns": 1,
            "rightColumns": 1
        }
    });
}

/*
* 工资信息显示*/
function wrecord() {
    $("#staff_salary_update").click();
    $("#cwageTip").html("");
    $("#cwageIds").attr("value",arguments[0]);
    $("#cwagesId").val(arguments[1]);
    $("#cwagesName").val(arguments[2]);
    $("#cjxw").val(arguments[3]);
    $("#callowance").val(arguments[4]);
    $("#cbouns").val(arguments[5]);
    $("#cpenalty").val(arguments[6]);
    $("#cwageIds").removeAttr("disabled");
}

/*工资修改*/
function wageUpdate() {
    var data = {
        "wagesId" : $("#cwageIds").attr("value"),
        "jxw" : $("#cjxw").val(),
        "allowance" : $("#callowance").val(),
        "bouns" : $("#cbouns").val(),
        "penalty" : $("#cpenalty").val()
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "wage/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功");
                wageTable.ajax.reload(null, false);
            }
        }
    });
}

/*工资台账*/
function setFlowBill() {
    var data = {
        "employeeId": mydata.employeeId
    };
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "wage/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                if (result.data.length !== 0) {
                    var thisdata = result.data;
                    var listmuea = {
                        "releaseTime": "时间",
                        "basePay": "基本工资",
                        "postWage": "岗位工资",
                        "jxw": "绩效津贴",
                        "allowance": "补助",
                        "bouns": "奖金",
                        "penalty": "罚扣",
                        "eInsurance": "养老保险",
                        "iInsurance": "医疗保险",
                        "uInsurance": "失业保险",
                        "wInsurance": "工伤保险",
                        "mInsurance": "生育保险",
                        "housingFund": "住房公积金",
                        "iitFeelsCold": "个人所得税",
                        "wageDeductedTax": "税后工资"
                    };
                    for (var i = 0; i < thisdata.length; i++) {
                            var liststr =
                                "<div class=\"row pl-4\">\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.basePay + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].basePay + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.postWage + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].postWage + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.jxw + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].jxw + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.allowance + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].allowance + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.bouns + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].bouns + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.penalty + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].penalty + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.eInsurance + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].eInsurance + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.iInsurance + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].iInsurance + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.uInsurance + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].uInsurance + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.wInsurance + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].wInsurance + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.mInsurance + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].mInsurance + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.housingFund + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].housingFund + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.iitFeelsCold + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-success\"><span>￥ " + thisdata[i].iitFeelsCold + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n" +
                                "                                            <div class=\"col-md-6 col-xl-3\">\n" +
                                "                                                <div class=\"card mb-3 widget-content bg-light\">\n" +
                                "                                                    <div class=\"widget-content-wrapper\">\n" +
                                "                                                        <div class=\"widget-content-left\">\n" +
                                "                                                            <div class=\"widget-heading text-dark\">" + listmuea.wageDeductedTax + "</div>\n" +
                                "                                                        </div>\n" +
                                "                                                        <div class=\"widget-content-right\">\n" +
                                "                                                            <div class=\"widget-numbers text-primary\"><span>￥ " + thisdata[i].wageDeductedTax + "</span>\n" +
                                "                                                            </div>\n" +
                                "                                                        </div>\n" +
                                "                                                    </div>\n" +
                                "                                                </div>\n" +
                                "                                            </div>\n";
                        $("#flowlist").append("<li class='mb-3'>\n" +
                            "<span style='width: 100%;text-align: left;padding-left: 25px'>" + listmuea.releaseTime + ":" + thisdata[i].releaseTime.substr(0, 10) + ":</span>\n" +
                            liststr +
                            "</li>");
                    }
                } else {
                    $("#flowlist").append("<div class='row pl-4'><div class='col-md-6 col-xl-3'>"
                        + "<div class='card mb-3 widget-content bg-light'><div class='widget-content-wrapper'><div class='widget-content-left'><div class='widget-heading text-dark'>基本工资</div>"
                        + "</div><div class='widget-content-right'><div class='widget-numbers text-success'><span>无信息</span></div></div></div></div></div>"
                    );
                }
            }
        }
    });
}

/*
* 工资导出*/

/*
* 员工工资表
* */
function setwageTable() {
    var wagesTable = $('#exportwagesList').DataTable({
        "dom": "Bfrtip",
        "buttons": [
            {
                "extend": "excelHtml5",
                "text": "导出选中内容",
                // "autoFilter": "true"
                "exportOptions": {
                    "columns": ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])
                },
                "extension": ".xlsx",
                "filename": "工资表"
            }
        ],
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "retrieve": "true",
        "ajax": {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
            },
            "url": baseUrl + "wage/qal",
            "dataType": "json",
            "type": "POST",
            "dataSrc": "data"
        },
        "columns": [
            {
                "data": "wagesId",
                "class": "fc-1 text-center"
            },
            {
                "data": "employeeId"
            },
            {
                "data": "employeeName",
                "orderable": false
            },
            {
                "data": "releaseTime"
            },
            {
                "data": "basePay",
                "orderable": false
            },
            {
                "data": "postWage",
                "orderable": false
            },
            {
                "data": "jxw",
                "orderable": false
            },
            {
                "data": "allowance",
                "orderable": false
            },
            {
                "data": "bouns",
                "orderable": false
            },
            {
                "data": "penalty",
                "orderable": false
            },
            {
                "data": "eInsurance",
                "orderable": false
            },
            {
                "data": "iInsurance",
                "orderable": false
            },
            {
                "data": "uInsurance",
                "orderable": false
            },
            {
                "data": "wInsurance",
                "orderable": false
            },
            {
                "data": "mInsurance",
                "orderable": false
            },
            {
                "data": "housingFund",
                "orderable": false
            },
            {
                "data": "iitFeelsCold",
                "orderable": false
            },
            {
                "data": "wageDeductedTax"
            }
        ],
        "processing": true,
        "autoWidth": true
    })
}

/*
* 工资导入*/

/*
* 账号设置
* */

/*description: 填入民族下拉列表参数*/
function setNatOption() {
    $("#ENationnal").empty();
    $("#ENationnal").append("<option value = '3623'>请选择</option>");
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"dicNote": "民族"}),
        success: function (result) {
            if (result.resultCode === 200) {
                var natdata = result.data;
                for (i = 0; i < natdata.length; i++) {
                    var option = "<option value = '" + natdata[i].dicId + "'>" + natdata[i].dicValue + "</option>";
                    $("#ENationnal").append(option)
                }
                $("select[name='nattional'] > option[value='" + mydata.nattional.dicId + "']").attr("selected", "selected")
            }
        }
    });
}

/*添加省的select中option*/
function setAdd1Option() {
    $("#Home_Address01").empty();
    $("#Home_Address02").empty();
    $("#Home_Address03").empty();
    $("#Natives01").empty();
    $("#Natives01").append("<option name='7101' value = '3568'>请选择</option>");
    $("#Home_Address01").append("<option name='7101' value = '3568'>请选择</option>");
    $("#Home_Address02").append("<option name='7101' value = '3568'>请选择</option>");
    $("#Home_Address03").append("<option name='7101' value = '3568'>请选择</option>");
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"dicRelation": "0"}),
        success: function (result) {
            if (result.resultCode === 200) {
                var add1data = result.data;
                for (i = 0; i < add1data.length; i++) {
                    var option = "<option name='" + add1data[i].dicNote + "' value = '" + add1data[i].dicId + "'>" + add1data[i].dicValue + "</option>";
                    $("#Home_Address01").append(option);
                    $("#Natives01").append(option)
                }
            }
            $("select[name='natives01'] > option[value='" + mydata.natives01.dicId + "']").attr("selected", "selected");
            if ($("select[name='natives01'] > option[value='" + mydata.natives01.dicId + "']").attr("selected") === "selected")
                $("select[name='natives01']").trigger('change');
            $("select[name='homeAddress1'] > option[value='" + mydata.homeAddress1.dicId + "']").attr("selected", "selected");
            if ($("select[name='homeAddress1'] > option[value='" + mydata.homeAddress1.dicId + "']").attr("selected") === "selected")
                $("select[name='homeAddress1'] ").trigger('change');
        }
    });
}

/*住址二级联动*/
function setAdd2Option(a) {
    $("#Home_Address02").empty();
    $("#Home_Address03").empty();
    $("#Home_Address03").append("<option name='7101' value = '3568'>请选择</option>");
    $("#Home_Address02").append("<option name='7101' value = '3568'>请选择</option>");
    if (a.selectedIndex === 0)
        return;
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                var add2data = result.data;
                for (i = 0; i < add2data.length; i++) {
                    var option = "<option name='" + add2data[i].dicNote + "'value = '" + add2data[i].dicId + "'>" + add2data[i].dicValue + "</option>";
                    $("#Home_Address02").append(option)
                }
            }
            $("select[name='homeAddress2'] > option[value='" + mydata.homeAddress2.dicId + "']").attr("selected", "selected");
            if ($("select[name='homeAddress2'] > option[value='" + mydata.homeAddress2.dicId + "']").attr("selected") == "selected")
                $("select[name='homeAddress2'] ").trigger('change');
        }
    });
}

function setAdd3Option(a) {
    $("#Home_Address03").empty();
    $("#Home_Address03").append("<option name='7101' value = '3568'>请选择</option>");
    if (a.selectedIndex === 0)
        return;
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                var add3data = result.data;
                for (i = 0; i < add3data.length; i++) {
                    var option = "<option name='" + add3data[i].dicNote + "'value = '" + add3data[i].dicId + "'>" + add3data[i].dicValue + "</option>";
                    $("#Home_Address03").append(option)
                }
            }
            $("select[name='homeAddress3'] > option[value='" + mydata.homeAddress3.dicId + "']").attr("selected", "selected");
        }
    });
}

/*籍贯二级联动*/
function setNatives02(a) {
    $("#Natives02").empty();
    $("#Natives02").append("<option name='7101' value = '3568'>请选择</option>");
    if (a.selectedIndex === 0)
        return;
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "dic/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                var add1data = result.data;
                for (i = 0; i < add1data.length; i++) {
                    var option = "<option name='" + add1data[i].dicNote + "' value = '" + add1data[i].dicId + "'>" + add1data[i].dicValue + "</option>";
                    $("#Natives02").append(option)
                }
                $("select[name='natives02'] > option[value='" + mydata.natives02.dicId + "']").attr("selected", "selected");
            }
        }
    });
}

/*切换主页菜单*/
function selectionActions(a, toUrl) {
    $(".vertical-nav-menu > li > a").attr("class", "");
    $(".vertical-nav-menu > li > ul > li > a").attr("class", "");
    $(a).attr("class", "mm-active");
    $("div[name*='admin']").css("display", "none");
    $("div[name*=" + toUrl + "]").css("display", "block");
}

/*
* 保存账号资料
* */
function setEmployee(){
    var data = {
        "employeeId": mydata.employeeId,
        "email": $("input[name='email']").val(),
        "epassword": $("input[name='epassword']").val(),
        "employeeName": $("input[name='employeeName']").val(),
        "sex": $("select[name='sex']").val(),
        "age": $("input[name='age']").val(),
        "nattional": $("select[name='nattional']").val(),
        "natives01": $("select[name='natives01']").val(),
        "natives02": $("select[name='natives02']").val(),
        "pol": $("select[name='pol']").val(),
        "brith": $("input[name='brith']").val(),
        "idNumber": $("input[name='idNumber']").val(),
        "education": $("select[name='education']").val(),
        "university": $("input[name='university']").val(),
        "major": $("input[name='major']").val(),
        "homeAddress1": $("select[name='homeAddress1']").val(),
        "homeAddress2": $("select[name='homeAddress2']").val(),
        "homeAddress3": $("select[name='homeAddress3']").val(),
        "homeNote": $("input[name='homeNote']").val(),
        "phone": $("input[name='phone']").val(),
        "marriage": $("select[name='marriage']").val(),
        "health": $("select[name='health']").val(),
        "bloodType": $("select[name='bloodType']").val(),
        "note": $("textarea[name='note']").val()
    };
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (data.email.length < 6 || !reg.test(data.email)){showError("请正确输入邮箱！");return;}
    if (data.epassword.length < 6){showError("请正确输入密码！");return;}
    if (data.employeeName.length === 0 || data.employeeName === "姓名"){showError("请正确输入姓名！");return;}
    if (data.idNumber.length !== 18){showError("请正确输入身份证号！");return;}
    if (data.phone.length !== 11){showError("请正确输入电话！");return;}
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",
        url: baseUrl + "user/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        async: false,
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功");
                onloadSet();
                setDataInto()
            }
        }
    });

}

/*头像保存*/
function headicon_save() {
    var nheadIcon = $("div[class*='header-icons'] > div[class='bavatcheak']").attr("name");
    var datas = {"employeeId": mydata.employeeId, "headIcon": nheadIcon};
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("pwmsToken")
        },
        type: "POST",//方法类型
        url: baseUrl + "user/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(datas),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("修改成功～");
                $("body > div.modal.fade.headIconChange.show > div > div > div.modal-header > button > span").click();
                onloadSet();
                setHeadicon()
            }
        }
    });
}

/*错误提示*/
function showError(a) {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        icon: 'error',
        title: a
    });
}

/*成功提示*/
function showSuccess(a) {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        icon: 'success',
        title: a
    });
}
