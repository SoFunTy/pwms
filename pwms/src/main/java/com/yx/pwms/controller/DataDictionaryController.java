package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.controller.common.ResultGenerator;
import com.yx.pwms.entity.DataDictionary;
import com.yx.pwms.service.DataDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/dic")
public class DataDictionaryController {

    @Autowired
    private DataDictionaryService dataDictionaryService;

    /**
     * description:
     *  查询所有
     * @return
     * @params
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAllDataDictionary() {
        List<DataDictionary> dataDictionary = dataDictionaryService.queryAll();
        return Checker.check(dataDictionary);
    }

    /**
     * 查询某列表
     *
     * @param map
     */
    @RequestMapping(value = "/qli", method = RequestMethod.POST)
    @ResponseBody
    public Result queryList(@RequestBody Map<String, String> map) {
        List<DataDictionary> DataDictionary = dataDictionaryService.queryBy(map);
        return Checker.check(DataDictionary);
    }

    /**
     * 查询单个
     */
    @RequestMapping(value = "/qby", method = RequestMethod.POST)
    @ResponseBody
    public Result queryByDataDictionaryId(@RequestBody Map<String, String> map) {
        if (Objects.isNull(map.get("dicId"))) {
            return ResultGenerator.genErrorResult(406, "error");
        }
        DataDictionary DataDictionary = dataDictionaryService.queryByDataDictionaryId(Long.parseLong(map.get("dicId")));
        return Checker.check(DataDictionary);
    }

}
