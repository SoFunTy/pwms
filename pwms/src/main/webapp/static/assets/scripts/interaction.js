/**
 * description: 根据权限显示对于模块
 *     //权限等级 3<2<1
 * @params a 等级
 */
var data = JSON.parse(window.sessionStorage.getItem("data"))

var baseUrl = "http://localhost:8080/pwms/"

function userTypeCheck(a) {
    switch (a) {
        case 3:
            $("li[name*='common']").css("display", "block")
            break;
        case 2:
            $("li[name*='checker']").css("display", "block")
            break;
        case 1:
            $("li[name*='admin']").css("display", "block")
            break;
        default:
            break;
    }
    $("div[name*='admin']").css("display", "none")
    $("div[name*='index']").css("display","block")
}

$(document).ready(function () {
    // var data = JSON.parse(window.sessionStorage.getItem("data"))
    setData()
    userTypeCheck(1)
});

/**
 * description: 参数填入
 */
function setData() {
    setsexOption()
    setAdd1Option()
    setDataInto()
}

//headicon change
function headicon(a) {
    $("div[class*='header-icons'] > div").attr("class","bavat")
    $(a).attr("class","bavatcheak")
}


function setDataInto() {
    $("div[class='rounded-circle avat float-left']").attr("class","rounded-circle avat avatar" + data.headIcon + " float-left")
    $("div[name='" + data.headIcon +"']").attr("class","bavatcheak")

    $("div[class*='employee-name']").html(data.employeeName)
    $("div[class*='employee-position']").html(data.positionId.positionName)

    $("label[name='employeeId']").html(data.employeeId)
    $("label[name='positionId']").html(data.positionId.positionName)
    $("label[name='oinTime']").html(data.oinTime)

    $("input[name='email']").val(data.email)
    $("input[name='epassword']").val(data.epassword)
    $("input[name='employeeName']").val(data.employeeName)
    $("select[name='sex']").find("option:contains('" + data.sex.dicValue + "')").attr("selected","selected")
    $("input[name='age']").val(data.age)

    $("select[name='pol'] > option[value='" + data.pol.dicId + "']").attr("selected","selected")
    $("input[name='brith']").val(data.brith)
    $("input[name='idNumber']").val(data.idNumber)

    $("select[name='education'] > option[value='" + data.education.dicId + "']").attr("selected","selected")
    $("input[name='university']").val(data.university)
    $("input[name='major']").val(data.major)

    $("select[name='natives01'] > option[value='" + data.natives01.dicId + "']").attr("selected","selected")
    $("select[name='natives02'] > option[value='" + data.natives02.dicId + "']").attr("selected","selected")
    $("select[name='homeAddress1'] > option[value='" + data.homeAddress1.dicValue + "']").attr("selected","selected")
    $("select[name='homeAddress2'] > option[value='" + data.homeAddress2.dicValue + "']").attr("selected","selected")
    $("select[name='homeAddress3'] > option[value='" + data.homeAddress3.dicValue + "']").attr("selected","selected")

    $("input[name='homeNote']").val(data.homeNote)

    $("input[name='phone']").val(data.phone)
    $("select[name='marriage'] > option[value='" + data.marriage.dicValue + "']").attr("selected","selected")
    $("select[name='health'] > option[value='" + data.health.dicValue + "']").attr("selected","selected")
    $("select[name='bloodType'] > option[value='" + data.bloodType.dicId + "']").attr("selected","selected")
    $("input[name='note']").val(data.note)
}

/**
 * description: 填入民族下拉列表参数
 */
function setsexOption(){
    $("#ENationnal").append("<option value = '3623'>请选择</option>")
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "dis/qli",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify({"dicNote": "民族"}),
        success: function (result) {
            if (result.resultCode == 200) {
                var natdata = result.data
                for (i = 0; i < natdata.length ; i++){
                    var option =  "<option value = '" + natdata[i].dicId + "'>" + natdata[i].dicValue + "</option>";
                    $("#ENationnal").append(option)
                }
                $("select[name='nattional'] > option[value='" + data.nattional.dicId + "']").attr("selected","selected")
            }
        },
        error: function () {
            showError("接口异常，请联系管理员！");
            return;
        }
    });
}

/**
 * description: 添加省的select中option
 */
function setAdd1Option() {
    $("#Home_Address01").empty()
    $("#Home_Address02").empty()
    $("#Home_Address03").empty()
    $("#Natives01").empty()
    $("#Natives01").append("<option name='7101' value = '3568'>请选择</option>")
    $("#Home_Address01").append("<option name='7101' value = '3568'>请选择</option>")
    $("#Home_Address02").append("<option name='7101' value = '3568'>请选择</option>")
    $("#Home_Address03").append("<option name='7101' value = '3568'>请选择</option>")
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "dis/qli",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify({"dicRelation": "0"}),
        success: function (result) {
            if (result.resultCode == 200) {
                var add1data = result.data
                for (i = 0; i < add1data.length ; i++){
                    var option =  "<option name='" + add1data[i].dicNote + "' value = '" + add1data[i].dicId + "'>" + add1data[i].dicValue + "</option>";
                    $("#Home_Address01").append(option)
                    $("#Natives01").append(option)
                }
            }
        },
        error: function () {
            showError("接口异常，请联系管理员！");
            return;
        }
    });
}
//住址二级联动
function setAdd2Option(a) {
    $("#Home_Address02").empty()
    $("#Home_Address03").empty()
    $("#Home_Address03").append("<option name='7101' value = '3568'>请选择</option>")
    $("#Home_Address02").append("<option name='7101' value = '3568'>请选择</option>")
    if (a.selectedIndex == 0)
        return
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")}
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "dis/qli",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                var add2data = result.data
                for (i = 0; i < add2data.length ; i++){
                    var option =  "<option name='" + add2data[i].dicNote + "'value = '" + add2data[i].dicId + "'>" + add2data[i].dicValue + "</option>";
                    console.log(option)
                    $("#Home_Address02").append(option)
                }
            }
        },
        error: function () {
            showError("接口异常，请联系管理员！");
            return;
        }
    });
}
function setAdd3Option(a) {
    $("#Home_Address03").empty()
    $("#Home_Address03").append("<option name='7101' value = '3568'>请选择</option>")
    if (a.selectedIndex == 0)
        return
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")}
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "dis/qli",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                var add3data = result.data
                for (i = 0; i < add3data.length ; i++){
                    var option =  "<option name='" + add3data[i].dicNote + "'value = '" + add3data[i].dicId + "'>" + add3data[i].dicValue + "</option>";
                    console.log(option)
                    $("#Home_Address03").append(option)
                }
            }
        },
        error: function () {
            showError("接口异常，请联系管理员！");
            return;
        }
    });
}
//籍贯二级联动
function setNatives02(a) {
    $("#Natives02").empty()
    $("#Natives02").append("<option name='7101' value = '3568'>请选择</option>")
    if (a.selectedIndex == 0)
        return
    data = {"dicRelation": $(a.options[a.selectedIndex]).attr("name")}
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "dis/qli",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                var add1data = result.data
                for (i = 0; i < add1data.length ; i++){
                    var option =  "<option name='" + add1data[i].dicNote + "' value = '" + add1data[i].dicId + "'>" + add1data[i].dicValue + "</option>";
                    $("#Natives02").append(option)
                }
            }
        },
        error: function () {
            showError("接口异常，请联系管理员！");
            return;
        }
    });
}

/**
 * description:
 * @params a html的对象自身this
 * @return
 */
function selectionActions(a, toUrl){
    $(".vertical-nav-menu > li > a").attr("class","")
    $(".vertical-nav-menu > li > ul > li > a").attr("class","")
    $(a).attr("class","mm-active")
    $("div[name*='admin']").css("display", "none")
    $("div[name*=" + toUrl + "]").css("display","block")
}

/*
* 头像保存
* */
function headicon_save() {
    var nheadIcon = $("div[class*='header-icons'] > div[class='bavatcheak']").attr("name")
    var datas = {"employeeId":data.employeeId, "headIcon":nheadIcon}
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "user/upd",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify(datas),
        success: function (result) {
            if (result.resultCode == 200) {
                window.location.reload()
            }
        },
        error: function () {
            showError("异常，请联系管理员！");
            return;
        }
    });
}

/**
 * 错误提示框
 * @param String
 * @return null
 */
function showError(a) {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        type: 'error',
        title: a
    });
}

/**
 * 成功提示框
 * @param String
 * @return null
 */
function showSuccess() {
    Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        type: 'success',
        title: '登录成功'
    });
}