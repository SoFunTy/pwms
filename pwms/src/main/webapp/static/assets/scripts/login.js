
// var baseUrl = "http://vu.pwms.xyz/";
// var baseUrl = "http://149.28.134.240:80/pwms/";
var baseUrl = "http://localhost:8080/pwms/";
localStorage.setItem('pwmsToken', "");
localStorage.setItem('pwmsempId', "");
/**
 * 判空
 *
 * @param obj
 * @returns {boolean}
 */
function isNull(obj) {
    if (obj == null || obj.trim() === "") {
        return true;
    }
    return false;
}

/**
 * 参数长度验证
 *
 * @param obj
 * @param length
 * @returns {boolean}
 */
function validLength(obj, length) {
    if (obj.trim().length >= length) {
        return true;
    }
    return false;
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
        icon: 'error',
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
        icon: 'success',
        title: '登录成功'
    });
}

/*
* 登录验证
* */
function login() {
    var account = $("#account").val();
    var password = $("#password").val();
    if (isNull(account)) {
        showError("请输入账号!");
        return false;
    }
    if (!validLength(account, 6)) {
        showError("请输入正确的账号!");
        return false;
    }
    if (isNull(password)) {
        showError("请输入密码!");
        return false;
    }
    if (!validLength(password, 6)) {
        showError("请输入正确的密码!");
        return false;
    }
    var data = {email: account, epassword: password};
    $.ajax({
        type: "POST",//方法类型
        url: baseUrl + "user/login",
        dataType:"json",
        contentType : "application/json;charset=UTF-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode === 200) {
                showSuccess();
                var resDate = JSON.parse(result.data);
                localStorage.setItem('pwmsToken', resDate.token);
                localStorage.setItem('pwmsempId', resDate.employeeId);
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 1500);
                return;
            }
            if (result.resultCode === 409 || result.resultCode === 410 ) {
                showError("登陆失败!请检查账号和密码！");
                return;
            }
        },
        error: function () {
            showError("异常，请联系管理员！");
            return;
        }
    });
}