package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.Employee;
import com.yx.pwms.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    /**
     * 添加
     */
    @RequestMapping(value = "/eminsert", method = RequestMethod.POST)
    @ResponseBody
    public Result inserEmployee(@RequestBody Map<String, String> map) {
        Map<String, Object> maps = new HashMap<>();
        maps.putAll(check(map));
        if (maps == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (employeeService.queryExist(maps.get("employeeId").toString(), maps.get("account").toString()) == 1) {
            return ResultGenerator.genErrorResult(407, "已存在");
        }
        int statu = employeeService.insertEmployee(maps);
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/emdelete", method = RequestMethod.POST)
    @ResponseBody
    public Result delEmployee(@RequestBody Map<String, String> map) {
        if (employeeService.queryExist(map.get("employeeId"), null) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = employeeService.deleteEmployee(map.get("employeeId"));
        return Checker.check(statu);
    }

    /**
     * 查询多个
     */
    @RequestMapping(value = "/emquerylist", method = RequestMethod.POST)
    @ResponseBody
    public Result queryLsit(@RequestBody Map<String, Object> map) {
        List<Employee> employees = employeeService.queryList(map);
        return Checker.check(employees);
    }

    /**
     * 查询单个
     */
    @RequestMapping(value = "/emqueryby", method = RequestMethod.POST)
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
    public Result login(@RequestBody Map<String, String> map) {
        if (map.get("email") == null || map.get("email").length() == 0 ||
                map.get("epassword") == null || map.get("epassword").length() == 0){
            return ResultGenerator.genErrorResult(410, "检查输入");
        }
        if(employeeService.queryExist(null, map.get("email")) == 1) {
        Employee employee = employeeService.login(map.get("email"), map.get("epassword"));
        return Checker.check(employee);
        }
        return ResultGenerator.genErrorResult(410, "账号或密码错误");
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/emupdate", method = RequestMethod.POST)
    @ResponseBody
    public Result updateEmployee(@RequestBody Map<String, Object> map) {
        if (map.get("employeeId").toString() == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (employeeService.queryExist(map.get("employeeId").toString(), map.get("account").toString()) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = employeeService.updateEmployee(map);
        return Checker.check(statu);
    }

    /**
     * description: 非空参数检验
     *
     * @return Map
     * @params Map<String, String> map
     */
    private Map check(Map<String, String> map) {
        if (map.get("employeeId") == null || map.get("employeeId").length() == 0 ||
                map.get("email") == null || map.get("email").length() == 0 ||
                map.get("epassword") == null || map.get("epassword").length() == 0 ||
                map.get("positionId") == null || map.get("positionId").length() == 0 ||
                map.get("employeeName") == null || map.get("employeeName").length() == 0) {
            return null;
        }
        return map;
    }
}
