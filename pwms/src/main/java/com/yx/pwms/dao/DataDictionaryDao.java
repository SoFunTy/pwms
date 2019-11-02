package com.yx.pwms.dao;

import com.yx.pwms.entity.DataDictionary;
import com.yx.pwms.entity.DataDictionary;

import java.util.List;
import java.util.Map;

/**
 * create by: xubi
 * create time: 2019-10-25
 */
public interface DataDictionaryDao {
    /**
     * description: 添加字典数据
     * @params DataDictionary dataDictionary
     * @return int
     */
    int insertDataDictionary(DataDictionary dataDictionary);

    /**
     * description: 删除字典数据
     * @params long dicId
     * @return int
     */
    int delDataDictionary(long dicId);

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

    /**
     * description: 更新字典数据
     * @params DataDictionary dataDictionary
     * @return int
     */
    int updateDataDictionary(DataDictionary dataDictionary);

}
