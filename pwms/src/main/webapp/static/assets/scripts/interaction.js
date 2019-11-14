var mydata = JSON.parse(window.sessionStorage.getItem("mydata"));
// var baseUrl = "http://167.179.81.212:8080/pwms/";
var baseUrl = "http://localhost:8080/pwms/";
/*数据表格对象以及临时数据保存对象*/
var empTable;
var ndata = "";
var wageTable;
var wdata = "";
var staffTable;
var sdata = "";
//登录验证
// if (data == null || data === ""){
//     showError("请登录！")
//     window.location.href = baseUrl;
// }

setData();
userTypeCheck(mydata.permission.dicValue);

$("#personnel_management_all").on("click", function () {
    setempTable()
});
// $("#personnel_management_single").one("click", function () {
//     if (ndata === "") {
//         record(mydata.employeeId)
//     }
// });
$("#personnel_department_management").on("click", function () {
    setDepartment()
});
$("#staff_induction").on("click", function () {
    setstaffTable()
})
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

/**
 * description: 根据权限显示对于模块
 * 权限等级 3<2<1
 * @params a 等级
 */
function userTypeCheck(a) {
    switch (a) {
        case "3":
            $("li[name*='common']").css("display", "block");
            break;
        case "2":
            $("li[name*='checker']").css("display", "block");
            break;
        case "1":
            $("li[name*='admin']").css("display", "block");
            break;
        default:
            break;
    }
    $("div[name*='admin']").css("display", "none");
    $("div[name*='index']").css("display", "block")
}


/**
 * description: 数据加载
 */
function setData() {
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

/*登出*/
function logout() {
    window.sessionStorage.removeItem('mydata');
    window.location.href = baseUrl;
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
        type: "POST",
        url: baseUrl + "rap/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                if (result.data.length === 0) {
                    console.log("无奖罚");
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
                for (var i = 0 ; i < result.data.length ; i++){
                    if (resdata[i].reward !== 0){
                        $("div.app-main__outer > div > div:nth-child(15) > div:nth-child(3)").append(" " +
                            "                       <div class='col-md-6 col-xl-3'>" +
                            "                           <div class='widget-content-wrapper text-white' data-toggle='tooltip' data-placement='top' title='' data-original-title='时间：'>" +
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
                    }
                    else {
                        $("div.app-main__outer > div > div:nth-child(15) > div:nth-child(3)").append("" +
                            "                       <div class='col-md-6 col-xl-3'>" +
                            "                            <div class='card mb-3 widget-content bg-danger'>" +
                            "                                <div class='widget-content-wrapper text-white' data-toggle='tooltip' data-placement='top' title='' data-original-title='时间：" + resdata[i].recodingTime + "  具体情况：" + resdata[i].information + "'>" +
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
        type: "POST",
        url: baseUrl + "rap/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                if(result.data.length !== 0){
                    var resdata = result.data;
                    for (var i = 0 ; i < result.data.length ; i++){
                        if (resdata[i].reward !== 0){
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
                        }else{
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
                                "                                        <div class='widget-numbers text-danger'><span><font" +
                                "                                                style='vertical-align: inherit;'><font style='vertical-align: inherit;'>" + resdata[i].punishment + "</font></font></span>" +
                                "                                        </div>" +
                                "                                    </div>" +
                                "                                </div>" +
                                "                            </div>" +
                                "                        </div>");
                        }
                    }
                }
            }
        }
    });
}

/*
* 账号密码设置*/
function checkAValid(a) {
    if ($(a).val() !== "" || $(a).val().length > 4) {
        $.ajax({
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
    $.ajax({
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

/*
*设置主页工资信息*/
function setIndexWages() {
    $.ajax({
        type: "POST",
        url: baseUrl + "wage/qmy",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": mydata.employeeId}),
        success: function (result) {
            if (result.resultCode === 200) {
                if(result.data.length !== 0){
                    $("#lastMWage").html("￥ " + result.data.TOTAL);
                    $("span[name='LastMWages']").html("￥ " + result.data.TOTAL);
                    $("#lastMWageA").html("￥ " + result.data.O_ADD);
                    $("#lastMWageB").html("￥ " + result.data.O_BUCKLE)
                }else{
                    $("#lastMWage").html("￥ 0");
                    $("span[name='LastMWages']").html("￥ 0");
                    $("#lastMWageA").html("￥ 0");
                    $("#lastMWageB").html("￥ 0")
                }
            }
        }
    });
}

/*
*设置主页公告信息*/
function setNewNotice() {
    $.ajax({
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
        type: "POST",//方法类型
        url: baseUrl + "user/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        async: false,
        data: JSON.stringify({"employeeId": mydata.employeeId}),
        success: function (result) {
            if (result.resultCode === 200) {
                mydata = result.data;
                window.sessionStorage.setItem('mydata', JSON.stringify(result.data));
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
        type: "POST",
        url: baseUrl + "notice/qli",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({}),
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
                $("input[name='pemail']").val(ndata.email);
                $("input[name='pepassword']").val(ndata.epassword);
                $("input[name='pemployeeName']").val(ndata.employeeName);
                if (ndata.sex.dicValue !== null)
                    $("select[name='psex']").find("option:contains('" + ndata.sex.dicValue + "')").attr("selected", "selected");
                if (ndata.age !== null)
                    $("input[name='page']").val(ndata.age);
                if (ndata.pol.dicId !== null)
                    $("select[name='ppol'] > option[value='" + ndata.pol.dicId + "']").attr("selected", "selected");
                if (ndata.brith !== null)
                    $("input[name='pbrith']").val(ndata.brith);
                if (ndata.idNumber !== null)
                    $("input[name='pidNumber']").val(ndata.idNumber);
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
                if (ndata.marriage.dicId !== null)
                    $("select[name='pmarriage'] > option[value='" + ndata.marriage.dicId + "']").attr("selected", "selected");
                if (ndata.health.dicId !== null)
                    $("select[name='phealth'] > option[value='" + ndata.health.dicId + "']").attr("selected", "selected");
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
function setPosition() {
    $("select[name='ppositionId']").empty();
    $("select[name='ppositionId']").append("<option value = '3623'>请选择</option>");
    $("select[name='staffPos']").empty();
    $("select[name='staffPos']").append("<option value = '3623'>请选择</option>");
    $.ajax({
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
        "positionId": $("select[name='ppositionId']").val(),
        "oinTime": $("input[name='poinTime']").val(),
        "email": $("input[name='pemail']").val(),
        "epassword": $("input[name='pepassword']").val(),
        "employeeName": $("input[name='pemployeeName']").val(),
        "sex": $("select[name='psex']").val(),
        "age": $("input[name='page']").val(),
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
    $.ajax({
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
var depTable;

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

function depreload() {
    $("input[name='depId']").val("");
    $("input[name='depId']").removeAttr("readonly");
    $("input[name='depName']").val("");
    $("input[name='depChargeId']").val("")
}

function depChange(a) {
    $.ajax({
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
    if ($("input[name='depId']").attr("readonly") == null) {
        url = baseUrl + "dep/ins";
        if ($("input[name='depId']").val() === "" || $("input[name='depName']").val() === "") {
            showError("请正确输入");
            return;
        }
    }
    nData = {
        "departmentId": $("input[name='depId']").val(),
        "departmentName": $("input[name='depName']").val(),
        "departmentCharge": $("input[name='depChargeId']").val()
    };
    $.ajax({
        type: "POST",//方法类型
        url: url,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(nData),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功！");
                depTable.ajax.reload(null, false);
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
                "class": "fc-1",
                "orderable": false
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
        ]
    })
}

/*加载数据模态框*/
function srecord(a) {
    $.ajax({
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
    var data = {
        "employeeId": $("input[name='staffId']").val(),
        "employeeName": $("input[name='staffName']").val(),
        "positionId": $("select[name='staffPos']").val(),
        "oinTime": $("input[name='staffTime']").val(),
        "email": $("input[name='staffEmail']").val(),
        "epassword": $("input[name='staffPwd']").val()
    };
    $.ajax({
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
            "url": baseUrl + "wage/qal",
            "dataType": "json",
            "type": "POST",
            "dataSrc": "data"
        },
        "columns": [
            {
                "data": "wagesId",
                "class": "fc-1"
            },
            {
                "data": "employeeId"
            },
            {
                "data": "total"
            },
            {
                "data": "releaseTime"
            },
            {
                "data": "persion",
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
                "data": "fund",
                "orderable": false
            },
            {
                "data": "subsidy",
                "orderable": false
            },
            {
                "data": "oAdd",
                "orderable": false
            },
            {
                "data": "oBuckle",
                "orderable": false
            },
            {
                "data": "wagesId",
                "orderable": false,
                "mRender": function (data, type, full) {
                    return "<button  class='mb-2 mr-2 border-0 btn-transition btn btn-outline-secondary' onclick='wrecord(" + data + ")'>修改</button>";
                }
            }
        ]
    })
}

/*
* 工资信息显示*/
function wrecord(a) {

}


/*
* 账号设置
* */

/*description: 填入民族下拉列表参数*/
function setNatOption() {
    $("#ENationnal").empty();
    $("#ENationnal").append("<option value = '3623'>请选择</option>");
    $.ajax({
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
function setEmployee() {
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
    $.ajax({
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

/*确认框*/
function confirm() {
    Swal.fire({
        title: '确定删除?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确认'
    }).then((result) => {
        if (result.value) {
            a
        }
    })
}
