package com.yx.pwms.service.impl;

import com.yx.pwms.dao.EmployeeDao;
import com.yx.pwms.entity.Employee;
import com.yx.pwms.service.EmployeeService;
import com.yx.pwms.utils.JWTUtils;
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
        if (!Objects.isNull(map.get("epassword"))){
            map.put("epassword", MD5Util.MD5Encode(map.get("epassword").toString(), "UTF-8"));
        }
        return employeeDao.queryList(map);
    }

    @Override
    public Employee queryByEmployeeId(String employeeId) {
        return employeeDao.queryByEmployeeId(employeeId);
    }

    @Override
    public String login(String account, String epassword) {
        Map<String, Object> map = new HashMap<>();
        map.put("email", account);
        map.put("epassword", MD5Util.MD5Encode(epassword, "UTF-8"));
        if (employeeDao.queryByAccountAndPassword(map) == null) {
            return null;
        } else {
            Map<String, Object> payload = new HashMap<String, Object>();
            payload.put("employeeId", employeeDao.queryByAccountAndPassword(map).getEmployeeId());
            try {
                String jwt = JWTUtils.createJWT("jwt", "", payload);
                return jwt;
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    @Override
    public int queryExist(String employeeId) {
        if (employeeDao.queryByEmployeeId(employeeId) != null){
            return 1;
        }
        return 0;
    }

    @Override
    public int queryExistByEmail(String email) {
        HashMap<String, Object> map = new HashMap<>();
        if (email != null && !email.equals("")) map.put("email",email);
        if ( employeeDao.queryList(map).size() != 0){
            return 1;
        }
        return 0;
    }

    @Override
    public int queryExist(String employeeId, String email) {
        HashMap<String, Object> map = new HashMap<>();
        if (email != null && !email.equals("")) map.put("email",email);
        if ( employeeDao.queryList(map).size() != 0 || employeeDao.queryByEmployeeId(employeeId) != null){
            return 1;
        }
        return 0;
    }

    @Override
    public int updateEmployee(Map<String, Object> map) {
        if (!Objects.isNull(map.get("epassword"))){
            if(map.get("epassword").toString().length() < 32)
                map.put("epassword", MD5Util.MD5Encode(map.get("epassword").toString(), "UTF-8"));
            else
                map.remove("epassword");
        }
        return employeeDao.updateEmployee(map);
    }

    @Override
    public void updateEmployeeById() {
        employeeDao.updateEmployeeById();
        return;
    }

    @Override
    public List<Map>  stsatisEmployee() {
        return employeeDao.stsatisEmployee();
    }

    @Override
    public int updatePasswd(String email) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("email",email);
        Employee employee = employeeDao.queryList(map).get(0);
        map.put("epassword", MD5Util.MD5Encode(employee.getIdNumber().substring(12,18), "UTF-8"));
        employeeDao.updatePasswd(map);
        return 1;
    }

}
