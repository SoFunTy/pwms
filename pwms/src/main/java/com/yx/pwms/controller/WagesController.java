package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.Wages;
import com.yx.pwms.service.WagesService;
import com.yx.pwms.service.impl.WagesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/wage")
public class WagesController {

    @Autowired
    private WagesService wagesService = new WagesServiceImpl();

    /**
     * 本月工资生成添加
     */
    @RequestMapping(value = "/ins", method = RequestMethod.POST)
    @ResponseBody
    public Result InsertWages() {
        List<Wages> raps = wagesService.queryList(new HashMap<>());
        return Checker.check(raps);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAll() {
        return Checker.check(wagesService.queryAll());
    }

    /**
     * 查询多个
     */
    @RequestMapping(value = "/qli", method = RequestMethod.POST)
    @ResponseBody
    public Result queryList(@RequestBody Map<String, Object> map) {
        List<Wages> raps = wagesService.queryList(map);
        return Checker.check(raps);
    }

    /**
     * 查询个人上月工资
     */
    @RequestMapping(value = "/qmy", method = RequestMethod.POST)
    @ResponseBody
    public Result queryMyWages(@RequestBody Map<String, Object> map) {
        Wages rap = wagesService.queryMy(map);
        return Checker.check(rap);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/up", method = RequestMethod.POST)
    @ResponseBody
    public Result updateRewardAndPunishment(@RequestBody Map<String, Object> map) {
        if (Objects.isNull(map.get("wagesId"))) return ResultGenerator.genErrorResult(406, "输入错误");
        if (wagesService.queryExist(Integer.parseInt(map.get("noticesId").toString())) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = wagesService.updateWages(map);
        return Checker.check(statu);
    }
}
