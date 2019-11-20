package com.yx.pwms.service;

import com.yx.pwms.entity.Employee;

import java.util.List;
import java.util.Map;

public interface EmployeeService {

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
     * description: login
     * parm String account, String password
     * return Employee
     * */
    Employee login(String account, String password);

    /**
     * description:
     * @params String departmentId
     * @return int
     */
    int queryExist(String employeeId);
    int queryExist(String employeeId, String email);

    /**
     * description: 员工信息更新
     * @params String employeeId
     * @return int
     */
    int updateEmployee(Map<String, Object> map);
    void updateEmployeeById();
}
