package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.RewardAndPunishment;
import com.yx.pwms.service.RewardAndPunishmentService;
import com.yx.pwms.service.impl.RewardAndPunishmentServiceImpl;
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
@RequestMapping("/rap")
public class RewardAndPunishmentController {

    @Autowired
    private RewardAndPunishmentService rapService = new RewardAndPunishmentServiceImpl();

    /**
     * 添加
     */
    @RequestMapping(value = "/ins", method = RequestMethod.POST)
    @ResponseBody
    public Result inserRewardAndPunishment(@RequestBody Map<String, Object> map) {
        map = check(map);
        if (map == null) return ResultGenerator.genErrorResult(406, "输入错误");
        int statu = rapService.insertRewardAndPunishment(map);
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public Result delRewardAndPunishment(@RequestBody Map<String, String> map) {
        if (rapService.queryExist(map.get("serialNumber")) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = rapService.deleteRewardAndPunishment(Long.parseLong(map.get("serialNumber")));
        return Checker.check(statu);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAll() {
        List<RewardAndPunishment> raps = rapService.queryList(new HashMap<>());
        return Checker.check(raps);
    }

    /**
     * 查询多个
     */
    @RequestMapping(value = "/qli", method = RequestMethod.POST)
    @ResponseBody
    public Result queryList(@RequestBody Map<String, Object> map) {
        List<RewardAndPunishment> raps = rapService.queryList(map);
        return Checker.check(raps);
    }

    /**
     * 查询奖罚
     */
    @RequestMapping(value = "/qap", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAp(@RequestBody Map<String, Object> map) {
        List raps = rapService.queryForRAP(map);
        return Checker.check(raps);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/up", method = RequestMethod.POST)
    @ResponseBody
    public Result updateRewardAndPunishment(@RequestBody Map<String, Object> map) {
        if (Objects.isNull(map.get("serialNumber")) || Objects.isNull(map.get("employeeId"))) return ResultGenerator.genErrorResult(406, "输入错误");
        if (rapService.queryExist(map.get("serialNumber").toString()) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = rapService.updateRewardAndPunishment(map);
        return Checker.check(statu);
    }

    /**
     * description: 非空参数检验
     *
     * @return Map
     * @params Map<String, String> map
     */
    private Map check(Map<String, Object> map) {
        if (Objects.isNull(map.get("employeeId")) || Objects.isNull(map.get("recodingTime")) || Objects.isNull(map.get("information"))
                || Objects.isNull(map.get("reward")) || Objects.isNull(map.get("punishment"))) {
            return null;
        }
        return map;
    }
}
