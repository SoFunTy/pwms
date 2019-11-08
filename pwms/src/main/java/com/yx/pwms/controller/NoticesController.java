package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.Notices;
import com.yx.pwms.service.NoticesService;
import com.yx.pwms.service.impl.NoticesServiceImpl;
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

/**
 * @author ：xubi
 * @date ：Created in 2019/11/8 下午12:08
 */
@Controller
@RequestMapping("/notice")
public class NoticesController {

    @Autowired
    private NoticesService noticesService = new NoticesServiceImpl();

    /**
     * 添加
     */
    @RequestMapping(value = "/ins", method = RequestMethod.POST)
    @ResponseBody
    public Result inserNotices(@RequestBody Map<String, Object> map) {
        map = check(map);
        if (map == null) return ResultGenerator.genErrorResult(406, "输入错误");
        int statu = noticesService.insertNotices(map);
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public Result delNotices(@RequestBody Map<String, String> map) {
        if (noticesService.queryExist(map.get("noticesId")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = noticesService.deleteNotices(Long.parseLong(map.get("serialNumber")));
        return Checker.check(statu);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAll() {
        List<Notices> raps = noticesService.queryList(new HashMap<>());
        return Checker.check(raps);
    }

    /**
     * 查询多个
     */
    @RequestMapping(value = "/qli", method = RequestMethod.POST)
    @ResponseBody
    public Result queryList(@RequestBody Map<String, Object> map) {
        List<Notices> raps = noticesService.queryList(map);
        return Checker.check(raps);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/up", method = RequestMethod.POST)
    @ResponseBody
    public Result updateRewardAndPunishment(@RequestBody Map<String, Object> map) {
        if (Objects.isNull(map.get("noticesId"))) return ResultGenerator.genErrorResult(406, "输入错误");
        if (noticesService.queryExist(map.get("noticesId").toString()) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = noticesService.updateNotices(map);
        return Checker.check(statu);
    }

    /**
     * description: 非空参数检验
     *
     * @return Map
     * @params Map<String, String> map
     */
    private Map check(Map<String, Object> map) {
        if (Objects.isNull(map.get("noticesDate")) || Objects.isNull(map.get("state")) ||
                Objects.isNull(map.get("notices"))) {
            return null;
        }
        return map;
    }
}
