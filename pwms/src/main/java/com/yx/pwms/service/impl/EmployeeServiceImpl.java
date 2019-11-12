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
import java.util.Objects;


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
    public int queryExist(String employeeId) {
        if (employeeDao.queryByEmployeeId(employeeId) != null){
            return 1;
        }
        return 0;
    }

    @Override
    public int queryExist(String employeeId, String email) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("employeeId",employeeId);
        if (email != null && email != "") map.put("email",email);
        if (employeeDao.queryList(map).size() != 0){
            return 1;
        }
        return 0;
    }

    @Override
    public int updateEmployee(Map<String, Object> map) {
        if (!Objects.isNull(map.get("epassword"))){
            if(map.get("epassword").toString().length() < 16)
                map.put("epassword", MD5Util.MD5Encode(map.get("epassword").toString(), "UTF-8"));
            else
                map.remove("epassword");
        }
        return employeeDao.updateEmployee(map);
    }

}
