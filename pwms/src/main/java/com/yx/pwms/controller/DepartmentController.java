package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.Department;
import com.yx.pwms.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * create by: xubi
 * create time: 2019-10-24
 */
@Controller
@RequestMapping("/department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    /**
     * 添加
     */
    @RequestMapping(value = "/deinsert", method = RequestMethod.POST)
    @ResponseBody
    public Result inserDepartment(@RequestBody Map<String, String> map) {
        Department department = check(map);
        if (department == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (departmentService.queryExist(department.getDepartmentId()) == 1) {
            return ResultGenerator.genErrorResult(407, "部门已存在");
        }
        int statu = departmentService.insertDepartment(department);
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/dedelete", method = RequestMethod.POST)
    @ResponseBody
    public Result delDepartment(@RequestBody Map<String, String> map) {
        if (departmentService.queryExist(map.get("departmentId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此部门");
        }
        int statu = departmentService.delDepartment(map.get("departmentId"));
        return Checker.check(statu);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/dequeryall", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAllDepartment() {
        List<Department> department = departmentService.queryAll();
        return Checker.check(department);
    }

    /**
     * 查询单个
     */
    @RequestMapping(value = "/dequeryby", method = RequestMethod.POST)
    @ResponseBody
    public Result queryByDepartmentId(@RequestBody Map<String, String> map) {
        if (departmentService.queryExist(map.get("departmentId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此部门");
        }
        Department department = departmentService.queryByDepartmentId(map.get("departmentId"));
        return Checker.check(department);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/deupdate", method = RequestMethod.POST)
    @ResponseBody
    public Result updateDepartment(@RequestBody Map<String, String> map) {
        Department department = check(map);
        if (department == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (departmentService.queryExist(map.get("departmentId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此部门");
        }
        int statu = departmentService.updateDepartment(department);
        return Checker.check(statu);
    }

    /**
     * description: 检验参数完整
     *
     * @return Map<String, String> map
     * @params Department
     */
    private Department check(Map<String, String> map) {
        String departmentId = map.get("departmentId");
        String departmentName = map.get("departmentName");
        String departmentCharge = map.get("departmentCharge");
        if (departmentId == null || departmentId.length() == 0 || departmentName == null || departmentName.length() == 0 || departmentCharge == null || departmentCharge.length() == 0) {
            return null;
        }
        return new Department(departmentId, departmentName, departmentCharge);
    }
}
