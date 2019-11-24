package com.yx.pwms.dao;

import com.yx.pwms.entity.Wages;

import java.util.List;
import java.util.Map;

public interface WagesDao {

    /**
     * description: 添加
     *
     * @params Map<String, Object> map
     * @return int
     */
    int insertWages(Map<String, Object> map);

    /**
     * description: 删除
     * @params String employeeId
     * @return int
     */
    int deleteWages(long wagesId);

    /**
     * description: 查询
     * @params
     * @return Map<String, Object> map
     */
    List<Map> queryAll();

    /**
     * description: 查询
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    List<Wages> queryList(Map<String, Object> map);

    /**
     * description: 查询个人上月
     * @params Map<String, Object> map
     * @return List
     */
    Wages queryMy(String employeeId);

    /**
     * description: 更新
     * @params Map<String, Object> map
     * @return int
     */
    int updateWages(Map<String, Object> map);
    /**
     * description: 本年各部门工资计算
     * @params
     * @return
     */
    List<Map> stsatisThisYear();
    /**
     * description: 本月各部门工资计算
     * @params
     * @return
     */
    List<Map> stsatisThisMonth(Map<String, Object> map);
}
