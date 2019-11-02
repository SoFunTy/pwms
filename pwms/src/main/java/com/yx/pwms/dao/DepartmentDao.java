package com.yx.pwms.dao;

import com.yx.pwms.entity.Department;

import java.util.List;
/**
 * create by: xubi
 * create time: 2019-10-24
 */
public interface DepartmentDao {
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
     * description: 更新部门信息
     * @params Department departmentId
     * @return int
     */
    int updateDepartment(Department departmentId);

}
