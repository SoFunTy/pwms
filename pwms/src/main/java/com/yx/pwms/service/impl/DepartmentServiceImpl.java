package com.yx.pwms.service.impl;

import com.yx.pwms.dao.DepartmentDao;
import com.yx.pwms.entity.Department;
import com.yx.pwms.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentDao departmentDao;

    @Override
    public int insertDepartment(Department department) {
        return departmentDao.insertDepartment(department);
    }

    @Override
    public int delDepartment(String departmentId) {
        return departmentDao.delDepartment(departmentId);
    }

    @Override
    public List<Department> queryAll() {
        return departmentDao.queryAll();
    }

    @Override
    public Department queryByDepartmentId(String departmentId) {
        return departmentDao.queryByDepartmentId(departmentId);
    }

    @Override
    public int queryExist(String departmentId) {
        if (departmentDao.queryByDepartmentId(departmentId) != null){
            return 1;
        }else return 0;
    }

    @Override
    public int updateDepartment(Department department) {
        return departmentDao.updateDepartment(department);
    }


}
