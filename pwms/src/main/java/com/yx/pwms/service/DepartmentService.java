package com.yx.pwms.service;

import com.yx.pwms.entity.Department;

import java.util.List;

public interface DepartmentService {
    /**
     * description: 添加部门
     * @params Department department
     * @return int
     */
    int insertDepartment(Department department);

    /**
     * description: 删除部门
     * @params String departmentId
     * @return int
     */
    int delDepartment(String departmentId);

    /**
     * description: 查询所有部门
     * @return List<Department>
     */
    List<Department> queryAll();

    /**
     * description: 查询部门通过部门编号
     * @params String departmentId
     * @return Department
     */
    Department queryByDepartmentId(String departmentId);

    /**
     * description:
     * @params String departmentId
     * @return int
     */
    int queryExist(String departmentId);

    /**
     * description: 更新部门信息
     * @params String departmentId
     * @return int
     */
    int updateDepartment(Department department);
}
