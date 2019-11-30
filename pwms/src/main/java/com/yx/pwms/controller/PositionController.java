package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.Positions;
import com.yx.pwms.service.DepartmentService;
import com.yx.pwms.service.PositionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * create by: xubi
 * create time: 2019-10-24
 */
@Controller
@RequestMapping("/pos")
public class PositionController {

    @Autowired
    private PositionsService positionsService;

    @Autowired
    private DepartmentService departmentService;

    /**
     * 添加
     */
    @RequestMapping(value = "/ins", method = RequestMethod.POST)
    @ResponseBody
    public Result inserDepartment(@RequestBody Map<String, Object> map) {
        if (map == null) return ResultGenerator.genErrorResult(406, "输入错误");
        int statu = positionsService.insertPositions(map);
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public Result delDepartment(@RequestBody Map<String, String> map) {
        if (positionsService.queryExist(map.get("positionId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此职位");
        }
        int statu = positionsService.delPositions(map.get("positionId"));
        return Checker.check(statu);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAllDepartment() {
        List<Positions> positions = positionsService.queryAll();
        return Checker.check(positions);
    }

    /**
     * 查询单个
     */
    @RequestMapping(value = "/qby", method = RequestMethod.POST)
    @ResponseBody
    public Result queryByDepartmentId(@RequestBody Map<String, String> map) {
        if (positionsService.queryExist(map.get("positionId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此职位");
        }
        Positions positions = positionsService.queryByPositionsId(map.get("positionId"));
        return Checker.check(positions);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/up", method = RequestMethod.POST)
    @ResponseBody
    public Result updateDepartment(@RequestBody Map<String, String> map) {
        Positions positions = check(map);
        if (positions == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (positionsService.queryExist(map.get("positionId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此职位");
        }
        int statu = positionsService.updatePositions(positions);
        return Checker.check(statu);
    }

    /**
     * description: 检验参数完整
     *
     * @return Map<String, String> map
     * @params Department
     */
    private Positions check(Map<String, String> map) {
        if (Objects.isNull(map.get("positionId")) || Objects.isNull(map.get("departmentId")) ||
                Objects.isNull(map.get("positionName")) || Objects.isNull(map.get("positionBasePay")) ) {
            return null;
        }
        String positionId = map.get("positionId");
        String departmentId = map.get("departmentId");
        String positionName = map.get("positionName");
        Double positionBasePay = Double.parseDouble(map.get("positionBasePay"));
        return new Positions(positionId, departmentService.queryByDepartmentId(departmentId), positionName, positionBasePay);
    }

}
