package com.yx.pwms.service;

import com.yx.pwms.entity.Wages;

import java.util.List;
import java.util.Map;

public interface WagesService {
    /**
     * description: 添加
     *
     * @params Map<String, Object> map
     * @return int
     */
    int insertWages(Map<String, Object> map);

    /**
     * description: 查询
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    List<Wages> queryList(Map<String, Object> map);

    int queryExist(long wagesId);

    /**
     * description: 更新
     * @params Map<String, Object> map
     * @return int
     */
    int updateWages(Map<String, Object> map);
}
