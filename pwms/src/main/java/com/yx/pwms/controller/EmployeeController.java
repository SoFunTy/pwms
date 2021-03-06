package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.Employee;
import com.yx.pwms.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/user")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    /**
     * 添加
     */
    @RequestMapping(value = "/ins", method = RequestMethod.POST)
    @ResponseBody
    public Result inserEmployee(@RequestBody Map<String, Object> map) {
        map = check(map);
        if (map == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (employeeService.queryExist(map.get("employeeId").toString(), map.get("email").toString()) == 1) {
            return ResultGenerator.genErrorResult(407, "已存在");
        }
        int statu = employeeService.insertEmployee(map);
        employeeService.updateEmployeeById();
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public Result delEmployee(@RequestBody Map<String, String> map) {
        if (employeeService.queryExist(map.get("employeeId"), null) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = employeeService.deleteEmployee(map.get("employeeId"));
        return Checker.check(statu);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAll() {
        List<Employee> employees = employeeService.queryList(new HashMap<>());
        return Checker.check(employees);
    }

    /**
     * 查询多个
     */
    @RequestMapping(value = "/qli", method = RequestMethod.POST)
    @ResponseBody
    public Result queryList(@RequestBody Map<String, Object> map) {
        List<Employee> employees = employeeService.queryList(map);
        return Checker.check(employees);
    }

    /**
     * 查询单个
     */
    @RequestMapping(value = "/qby", method = RequestMethod.POST)
    @ResponseBody
    public Result queryByEmployeeId(@RequestBody Map<String, String> map) {
        if (employeeService.queryExist(map.get("employeeId"), null) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        Employee employee = employeeService.queryByEmployeeId(map.get("employeeId"));
        return Checker.check(employee);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Result login(@RequestBody Map<String, Object> map) {
        if (Objects.isNull(map.get("email")) || Objects.isNull(map.get("epassword"))) {
            return ResultGenerator.genErrorResult(410, "检查输入");
        }
        if (employeeService.queryExist(null, (String) map.get("email")) == 1) {
            String token = employeeService.login((String) map.get("email"), (String) map.get("epassword"));
            if (token == null)
                return ResultGenerator.genErrorResult(410, "账号或密码错误");
            else {
                Object resDate = "{\"token\":\"" + token +"\",\"employeeId\":\"" + employeeService.queryList(map).get(0).getEmployeeId() + "\"}";
                return Checker.check(resDate);
            }
        } else return ResultGenerator.genErrorResult(410, "账号或密码错误");
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/up", method = RequestMethod.POST)
    @ResponseBody
    public Result updateEmployee(@RequestBody Map<String, Object> map) {
        if (Objects.isNull(map.get("employeeId"))) return ResultGenerator.genErrorResult(406, "输入错误");
        if (employeeService.queryExist(map.get("employeeId").toString()) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = employeeService.updateEmployee(map);
        employeeService.updateEmployeeById();
        return Checker.check(statu);
    }

    /**
     * 根据工号查询名字
     */
    @RequestMapping(value = "/qbyname", method = RequestMethod.POST)
    @ResponseBody
    public Result queryByEmployeeIdForName(@RequestBody Map<String, String> map) {
        if (employeeService.queryExist(map.get("employeeId"), null) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        Employee employee = employeeService.queryByEmployeeId(map.get("employeeId"));
        if (!Objects.isNull(employee))
            return Checker.check(employee.getEmployeeName());
        return ResultGenerator.genErrorResult(408, "");
    }

    /**
     * 根据工号查询邮箱
     */
    @RequestMapping(value = "/qbyemail", method = RequestMethod.POST)
    @ResponseBody
    public Result queryByEmployeeIdForEmail(@RequestBody Map<String, String> map) {
        if (employeeService.queryExist(map.get("employeeId"), null) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        Employee employee = employeeService.queryByEmployeeId(map.get("employeeId"));
        if (!Objects.isNull(employee))
            return Checker.check(employee.getEmail());
        return ResultGenerator.genErrorResult(408, "");
    }

    /**
     * 重置链接发送
     */
    @RequestMapping(value = "/resetpw", method = RequestMethod.POST)
    @ResponseBody
    public Result RestPassword(@RequestBody Map<String, String> map) {
        if (employeeService.queryExistByEmail(map.get("email")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
//        String emailUrl = "<a href='http://www.bs.pwms.xyz/pwms/user/passwdReset?email="+map.get("email")+"'>点击重置</a>";
        String emailUrl = "<a href='http://127.0.0.1:8080/pwms/user/passwdReset?email="+map.get("email")+"'>点击重置</a>";
        com.ys.mail.EmailSenderUtils.sendEmial(map.get("email"),emailUrl);
        return Checker.check("发送成功");
    }

    @RequestMapping(value = "/passwdReset", method = RequestMethod.GET)
    @ResponseBody
    public String PasswordRest(String email) {
        employeeService.updatePasswd(email);
        return "http://192.168.16.123";
    }

    /**
     * description: 非空参数检验
     *
     * @return Map
     * @params Map<String, String> map
     */
    private Map check(Map<String, Object> map) {
        if (Objects.isNull(map.get("employeeId")) || Objects.isNull(map.get("email")) ||
                Objects.isNull(map.get("epassword")) || Objects.isNull(map.get("positionId")) ||
                Objects.isNull(map.get("employeeName")) ) {
            return null;
        }
        return map;
    }
}
