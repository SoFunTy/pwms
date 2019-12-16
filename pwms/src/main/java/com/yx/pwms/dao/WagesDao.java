package com.yx.pwms.dao;

import com.yx.pwms.entity.Wages;

import java.util.List;
import java.util.Map;

public interface WagesDao {

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
    /**
     * description: 计算上月工资
     * @params
     * @return
     */
    int insertNewWages(String time);
    int updateNewWagesTime(String time);
    int updateNewWagesBasePay(Double basePay);
    int updateNewWagesJwx(Double Jwx);
    int updateNewWagesAllowance(Double Allowance);
    int updateNewWagesPostWage();
    int updateNewWagesInsurance(String time);
    int updateNewWagesCold1(String time);
    int updateNewWagesCold2(String time);
    int updateNewWagesCold3(String time);
    int updateNewWagesCold4(String time);
    int updateNewWagesDeductrdTax(String time);
    /**
     * description: 更新后工资工资计算
     * @params
     * @return
     */
    int calculateWageById1(Integer wageId);
    int calculateWageById2(Integer wageId);
    int calculateWageById3(Integer wageId);
    int calculateWageById4(Integer wageId);
    int calculateWageById5(Integer wageId);
    int calculateWageById6(Integer wageId);
}
