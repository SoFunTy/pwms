package com.yx.pwms.service.impl;

import com.yx.pwms.dao.EmployeeDao;
import com.yx.pwms.entity.Employee;
import com.yx.pwms.service.EmployeeService;
import com.yx.pwms.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    @Override
    public int insertEmployee(Map<String, Object> map) {
        map.put("epassword", MD5Util.MD5Encode(map.get("epassword").toString(), "UTF-8"));
        return employeeDao.insertEmployee(map);
    }

    @Override
    public int deleteEmployee(String employeeId) {
        return employeeDao.deleteEmployee(employeeId);
    }

    @Override
    public List<Employee> queryList(Map<String, Object> map) {
        return employeeDao.queryList(map);
    }

    @Override
    public Employee queryByEmployeeId(String employeeId) {
        return employeeDao.queryByEmployeeId(employeeId);
    }

    @Override
    public Employee login(String account, String epassword) {
        Map<String, Object> map = new HashMap<>();
        map.put("email", account);
        map.put("epassword", MD5Util.MD5Encode(epassword,"UTF-8"));
        return employeeDao.queryByAccountAndPassword(map);
    }

    @Override
    public int queryExist(String employeeId, String account) {
        HashMap<String, Object> map = new HashMap<>();
        if (account != null) map.put("email",account);
        if (employeeDao.queryByEmployeeId(employeeId) != null || employeeDao.queryList(map) != null){
            return 1;
        }
        return 0;
    }

    @Override
    public int updateEmployee(Map<String, Object> map) {
        if (map.get("epassword") != null || map.get("epassword") != ""){
            map.put("epassword", MD5Util.MD5Encode(map.get("epassword").toString(), "UTF-8"));
        }
        return employeeDao.updateEmployee(map);
    }

}