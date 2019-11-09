var mydata = JSON.parse(window.sessionStorage.getItem("mydata"));
var baseUrl = "http://localhost:8080/pwms/";
//登录验证
// if (data == null || data === ""){
//     showError("请登录！")
//     window.location.href = baseUrl;
//
// }

setData();
userTypeCheck(mydata.permission.dicValue);

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
    if (mydata.permission.dicValue === "1") {
        setempTable();
        setDepartment();
    }
    //主页工资
    setIndexWages();
    //主页公告
    setNewNotice();
    //select选项加载
    setNatOption();
    setAdd1Option();
    //用户数据填入
    setDataInto();

    //公告信息
    setNotices()
}

/*头像设置*/
function headicon(a) {
    $("div[class*='header-icons'] > div").attr("class", "bavat");
    $(a).attr("class", "bavatcheak")
}

/*登出*/
function logout() {
    window.sessionStorage.removeItem('mydata');
    window.location.href = baseUrl;
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

function ampAdd() {
    var list = $('input:radio[name="customRadio"]:checked').val();
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
                $("#lastMWage").html("￥ " + result.data.TOTAL)
                $("#lastMWageA").html("￥ " + result.data.O_ADD)
                $("#lastMWageB").html("￥ " + result.data.O_BUCKLE)
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
                $("#indexNoticeTime").html(result.data.noticesDate)
                $("#indexNotice").html(result.data.notices)
            }
        }
    });
}

/*
*账号管理数据填入*/
function setDataInto() {
    $("div[class='rounded-circle avat float-left']").attr("class", "rounded-circle avat avatar" + mydata.headIcon + " float-left");
    $("div[name='" + mydata.headIcon + "']").attr("class", "bavatcheak");
    $("div[class*='employee-name']").html(mydata.employeeName);
    $("div[class*='employee-position']").html(mydata.positionId.positionName);
    $("label[name='employeeId']").html(mydata.employeeId);
    $("label[name='positionId']").html(mydata.positionId.positionName);
    $("label[name='oinTime']").html(mydata.oinTime);
    $("input[name='email']").val(mydata.email);
    $("input[name='epassword']").val(mydata.epassword);
    $("input[name='employeeName']").val(mydata.employeeName);
    $("select[name='sex']").find("option:contains('" + mydata.sex.dicValue + "')").attr("selected", "selected");
    $("input[name='age']").val(mydata.age);
    $("select[name='pol'] > option[value='" + mydata.pol.dicId + "']").attr("selected", "selected");
    $("input[name='brith']").val(mydata.brith);
    $("input[name='idNumber']").val(mydata.idNumber);
    $("select[name='education'] > option[value='" + mydata.education.dicId + "']").attr("selected", "selected");
    $("input[name='university']").val(mydata.university);
    $("input[name='major']").val(mydata.major);
    $("input[name='homeNote']").val(mydata.homeNote);
    $("input[name='phone']").val(mydata.phone);
    $("select[name='marriage'] > option[value='" + mydata.marriage.dicValue + "']").attr("selected", "selected");
    $("select[name='health'] > option[value='" + mydata.health.dicValue + "']").attr("selected", "selected");
    $("select[name='bloodType'] > option[value='" + mydata.bloodType.dicId + "']").attr("selected", "selected");
    $("input[name='note']").val(mydata.note)
}

/*
*初始化数据从加载*/
function onloadSet() {
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "user/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": mydata.employeeId}),
        success: function (result) {
            if (result.resultCode === 200) {
                mydata = result.data;
                window.sessionStorage.setItem('mydata', JSON.stringify(result.data));
                window.location.reload()
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
var empTable;

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

function record(a) {
    alert(a)
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
        "sex": $("select[name='sex'] > option[selected='selected']").attr("value"),
        "age": $("input[name='age']").val(),
        "nattional": $("select[name='nattional'] > option[selected='selected']").attr("value"),
        "natives01": $("select[name='natives01'] > option[selected='selected']").attr("value"),
        "natives02": $("select[name='natives02'] > option[selected='selected']").attr("value"),
        "pol": $("select[name='pol'] > option[selected='selected']").attr("value"),
        "brith": $("input[name='brith']").val(),
        "idNumber": $("input[name='idNumber']").val(),
        "education": $("select[name='education'] > option[selected='selected']").attr("value"),
        "university": $("input[name='university']").val(),
        "major": $("input[name='major']").val(),
        "homeAddress1": $("select[name='homeAddress1'] > option[selected='selected']").attr("value"),
        "homeAddress2": $("select[name='homeAddress2'] > option[selected='selected']").attr("value"),
        "homeAddress3": $("select[name='homeAddress3'] > option[selected='selected']").attr("value"),
        "homeNote": $("input[name='homeNote']").val(),
        "phone": $("input[name='phone']").val(),
        "marriage": $("select[name='marriage'] > option[selected='selected']").attr("value"),
        "health": $("select[name='health'] > option[selected='selected']").attr("value"),
        "bloodType": $("select[name='bloodType'] > option[selected='selected']").attr("value"),
        "note": $("input[name='note']").val()
    };
    console.log(data)
    $.ajax({
        type: "POST",
        url: baseUrl + "user/up",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("保存成功")
                onloadSet()
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
    var url = baseUrl + "dep/upd";
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
                showSuccess("保存成功！")
            } else {
                showError(result.message)
            }
        },
        error: function () {
            showError("后台错误，请联系管理员！");
        }
    });
    $("button[data-dismiss='modal']").click();
    depTable.ajax.reload(null, false);
}

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
    $("div[name*=" + toUrl + "]").css("display", "block")
}

/*头像保存*/
function headicon_save() {
    var nheadIcon = $("div[class*='header-icons'] > div[class='bavatcheak']").attr("name");
    var datas = {"employeeId": mydata.employeeId, "headIcon": nheadIcon};
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "user/upd",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(datas),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess("修改成功～");
                onloadSet()
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
