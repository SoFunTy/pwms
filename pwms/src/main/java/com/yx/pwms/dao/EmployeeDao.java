package com.yx.pwms.dao;

import com.yx.pwms.entity.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface EmployeeDao {

    /**
     * description: 员工添加
     *
     * @params Map<String, Object> map
     * @return int
     */
    int insertEmployee(Map<String, Object> map);

    /**
     * description: 员工删除
     * @params String employeeId
     * @return int
     */
    int deleteEmployee(String employeeId);

    /**
     * description: 查询多个员工信息
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    List<Employee> queryList(Map<String, Object> map);

    /**
     * description: 查询员工根据employeeId
     * @params String employeeId
     * @return Employee
     */
    Employee queryByEmployeeId(String employeeId);

    /*
     * login
     * parm Map<String, Object> map
     * return Employee
     * */
    Employee queryByAccountAndPassword(Map<String, Object> map);

    /**
     * description: 员工信息更新
     * @params Map<String, Object> map
     * @return int
     */
    int updateEmployee(Map<String, Object> map);

    void updateEmployeeById();

    /**
     * description: 在职、待入职情况
     * @params
     * @return
     */
    List<Map> stsatisEmployee();

    int updatePasswd(Map<String, Object> map);
}