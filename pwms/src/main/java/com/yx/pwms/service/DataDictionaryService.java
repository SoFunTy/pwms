package com.yx.pwms.service;

import com.yx.pwms.entity.DataDictionary;

import java.util.List;
import java.util.Map;

public interface DataDictionaryService {

    /**
     * description: 查询所有字典数据
     * @return List<DataDictionary>
     */
    List<DataDictionary> queryAll();

    /**
     * description: 查询字典数据通过条件
     * @params Map<String , String> map
     * @return List<DataDictionary>
     */
    List<DataDictionary> queryBy(Map<String , String> map);
    /**
     * description: 查询字典数据通过字典数据编号
     * @params long dicId
     * @return DataDictionary
     */
    DataDictionary queryByDataDictionaryId(long dicId);
}
