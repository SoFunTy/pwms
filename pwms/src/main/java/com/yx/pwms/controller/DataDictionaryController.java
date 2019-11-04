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

@Controller
@RequestMapping("/dic")
public class DataDictionaryController {

    @Autowired
    private DataDictionaryService dataDictionaryService;

    /**
     * 添加
     */
    @RequestMapping(value = "/ins", method = RequestMethod.POST)
    @ResponseBody
    public Result inserDataDictionary(@RequestBody Map<String, String> map) {
        DataDictionary dataDictionary = check(map);
        if (dataDictionary == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (dataDictionaryService.queryExist(dataDictionary.getDicId()) == 1) {
            return ResultGenerator.genErrorResult(407, "数据已存在");
        }
        int statu = dataDictionaryService.insertDataDictionary(dataDictionary);
        return Checker.check(statu);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public Result delDataDictionary(@RequestBody Map<String, String> map) {
        if (dataDictionaryService.queryExist(Integer.parseInt(map.get("dicId"))) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = dataDictionaryService.delDataDictionary(Integer.parseInt(map.get("dicId")));
        return Checker.check(statu);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/qal", method = RequestMethod.POST)
    @ResponseBody
    public Result queryAllDataDictionary() {
        List<DataDictionary> dataDictionary = dataDictionaryService.queryAll();
        return Checker.check(dataDictionary);
    }

    /**
     * 查询某列表
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
        if (dataDictionaryService.queryExist(Long.parseLong(map.get("dicId"))) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        DataDictionary DataDictionary = dataDictionaryService.queryByDataDictionaryId(Long.parseLong(map.get("dicId")));
        return Checker.check(DataDictionary);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/upd", method = RequestMethod.POST)
    @ResponseBody
    public Result updateDataDictionary(@RequestBody Map<String, String> map) {
        DataDictionary dataDictionary = check(map);
        if (dataDictionary == null) return ResultGenerator.genErrorResult(406, "输入错误");
        if (dataDictionaryService.queryExist(Long.parseLong(map.get("dicId"))) == 0) {
            return ResultGenerator.genErrorResult(408, "无此数据");
        }
        int statu = dataDictionaryService.updateDataDictionary(dataDictionary);
        return Checker.check(statu);
    }

    /**
     * description: 检验参数完整
     *
     * @return Map<String, String> map
     * @params DataDictionary
     */
    private DataDictionary check(Map<String, String> map) {
        String dicId = map.get("dicId");
        String dicNote = map.get("dicNote");
        String dicValue = map.get("dicValue");
        String dicRelation = map.get("dicRelation");
        if (
                dicNote == null || dicNote.length() == 0 ||
                dicValue == null || dicValue.length() == 0) {
            return null;
        }
        if (dicId != null || dicId.length() != 0 || dicRelation != null || dicRelation.length() != 0){
            return new DataDictionary(Long.parseLong(dicId), dicNote, dicValue, dicRelation);
        }
        if (dicId == null || dicId.length() == 0 || dicRelation == null || dicRelation.length() == 0){
            return new DataDictionary(dicNote, dicValue);
        }
        if (dicId == null || dicId.length() == 0 || dicRelation != null || dicRelation.length() != 0){
            return new DataDictionary(dicNote, dicValue, dicRelation);
        }
        if (dicId != null || dicId.length() != 0 || dicRelation == null || dicRelation.length() == 0){
            return new DataDictionary(Long.parseLong(dicId), dicNote, dicValue, dicRelation);
        }
        return null;
    }
}
