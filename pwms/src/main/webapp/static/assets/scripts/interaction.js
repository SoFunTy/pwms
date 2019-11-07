var data = JSON.parse(window.sessionStorage.getItem("data"));
var baseUrl = "http://localhost:8080/pwms/";


//登录验证
// if (data == null || data === ""){
//     showError("请登录！")
//     window.location.href = baseUrl;
//
// }
    setData();
    userTypeCheck(data.permission.dicValue);



/**
 * description: 根据权限显示对于模块
 *     //权限等级 3<2<1
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
 * description: 参数填入
 */
function setData() {
    if (data.permission.dicValue === "1"){
        setempTable();
        setDepartment();
    }
    setsexOption();
    setAdd1Option();
    setDataInto()
}



/*头像设置*/
function headicon(a) {
    $("div[class*='header-icons'] > div").attr("class", "bavat");
    $(a).attr("class", "bavatcheak")
}

/*登出*/
function logout() {
    window.sessionStorage.removeItem('data');
    window.location.href = baseUrl;
}

function checkValid(a) {
    if ($(a).val() !== "" || $(a).val().length > 5){
        $.ajax({
            type: "POST",
            url: baseUrl + "user/qbyname",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({"employeeId": $(a).val() }),
            success: function (result) {
                if (result.resultCode === 200 || result.data !== "") {
                    $("#cemployeeName").val(result.data);
                    $("#ampbtn").removeAttr("disabled")
                }
                if (result.resultCode === 408){
                    $("#cemployeeName").val("");
                    $("#ampbtn").attr("disabled","disabled")
                }
            }
        });
    }

}

/*账号管理数据填入*/
function setDataInto() {
    $("div[class='rounded-circle avat float-left']").attr("class", "rounded-circle avat avatar" + data.headIcon + " float-left");
    $("div[name='" + data.headIcon + "']").attr("class", "bavatcheak");
    $("div[class*='employee-name']").html(data.employeeName);
    $("div[class*='employee-position']").html(data.positionId.positionName);
    $("label[name='employeeId']").html(data.employeeId);
    $("label[name='positionId']").html(data.positionId.positionName);
    $("label[name='oinTime']").html(data.oinTime);
    $("input[name='email']").val(data.email);
    $("input[name='epassword']").val(data.epassword);
    $("input[name='employeeName']").val(data.employeeName);
    $("select[name='sex']").find("option:contains('" + data.sex.dicValue + "')").attr("selected", "selected");
    $("input[name='age']").val(data.age);
    $("select[name='pol'] > option[value='" + data.pol.dicId + "']").attr("selected", "selected");
    $("input[name='brith']").val(data.brith);
    $("input[name='idNumber']").val(data.idNumber);
    $("select[name='education'] > option[value='" + data.education.dicId + "']").attr("selected", "selected");
    $("input[name='university']").val(data.university);
    $("input[name='major']").val(data.major);
    $("select[name='natives01'] > option[value='" + data.natives01.dicId + "']").attr("selected", "selected");
    $("select[name='natives02'] > option[value='" + data.natives02.dicId + "']").attr("selected", "selected");
    $("select[name='homeAddress1'] > option[value='" + data.homeAddress1.dicValue + "']").attr("selected", "selected");
    $("select[name='homeAddress2'] > option[value='" + data.homeAddress2.dicValue + "']").attr("selected", "selected");
    $("select[name='homeAddress3'] > option[value='" + data.homeAddress3.dicValue + "']").attr("selected", "selected");
    $("input[name='homeNote']").val(data.homeNote);
    $("input[name='phone']").val(data.phone);
    $("select[name='marriage'] > option[value='" + data.marriage.dicValue + "']").attr("selected", "selected");
    $("select[name='health'] > option[value='" + data.health.dicValue + "']").attr("selected", "selected");
    $("select[name='bloodType'] > option[value='" + data.bloodType.dicId + "']").attr("selected", "selected");
    $("input[name='note']").val(data.note)
}

/*初始化数据从加载*/
function onloadSet() {

    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "user/qby",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({"employeeId": data.employeeId}),
        success: function (result) {
            if (result.resultCode === 200) {
                data = result.data;
                window.sessionStorage.setItem('data', JSON.stringify(result.data));
                window.location.reload()
            }
        }
    });
}


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
*
* 部门管理模块
*/
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




/**
 * description: 填入民族下拉列表参数
 */
function setsexOption() {
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
                $("select[name='nattional'] > option[value='" + data.nattional.dicId + "']").attr("selected", "selected")
            }
        }
    });
}

/**
 * description: 添加省的select中option
 */
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
        }
    });
}

//住址二级联动
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
                    console.log(option);
                    $("#Home_Address02").append(option)
                }
            }
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
                    console.log(option);
                    $("#Home_Address03").append(option)
                }
            }
        }
    });
}

//籍贯二级联动
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
            }
        }
    });
}

/**
 * description:
 * @params a html的对象自身this
 * @return
 */
function selectionActions(a, toUrl) {
    $(".vertical-nav-menu > li > a").attr("class", "");
    $(".vertical-nav-menu > li > ul > li > a").attr("class", "");
    $(a).attr("class", "mm-active");
    $("div[name*='admin']").css("display", "none");
    $("div[name*=" + toUrl + "]").css("display", "block")
}

/*
* 头像保存
* */
function headicon_save() {
    var nheadIcon = $("div[class*='header-icons'] > div[class='bavatcheak']").attr("name");
    var datas = {"employeeId": data.employeeId, "headIcon": nheadIcon};
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



/**
 * 错误提示框
 * @return null
 * @param a
 */
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

/**
 * 成功提示框
 * @return null
 * @param a
 */
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

/**
 * 确认框
 */
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
