package com.yx.pwms.service.impl;

import com.yx.pwms.dao.WagesDao;
import com.yx.pwms.entity.Wages;
import com.yx.pwms.service.WagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class WagesServiceImpl implements WagesService {

    @Autowired
    private WagesDao wagesDao;

    @Override
    public String insertWages() {
        Date a = new Date();
        DateFormat df1 = DateFormat.getDateInstance();
        String time = df1.format(a);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(a);
        calendar.set(Calendar.MONTH, calendar.get(Calendar.MONTH) - 1);
        String lastTime = new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
        Map<String, Object> map = new HashMap<>();
        map.put("releaseTime", time);
        if (queryList(map).size() == 0) {
            wagesDao.insertNewWages(lastTime);
            wagesDao.updateNewWagesTime(time);
            wagesDao.updateNewWagesBasePay(3000.0);
            wagesDao.updateNewWagesJwx(500.0);
            wagesDao.updateNewWagesAllowance(200.0);
            wagesDao.updateNewWagesPostWage();
            wagesDao.updateNewWagesInsurance(time);
            wagesDao.updateNewWagesCold1(time);
            wagesDao.updateNewWagesCold2(time);
            wagesDao.updateNewWagesCold3(time);
            wagesDao.updateNewWagesCold4(time);
            wagesDao.updateNewWagesDeductrdTax(time);
            return "200";
        } else
            return "407";
    }

    @Override
    public List<Wages> queryList(Map<String, Object> map) {
        return wagesDao.queryList(map);
    }

    @Override
    public List<Map> queryAll() {
        return wagesDao.queryAll();
    }

    @Override
    public Wages queryMy(Map<String, Object> map) {
        return wagesDao.queryMy((String) map.get("employeeId"));
    }

    @Override
    public int queryExist(Integer wagesId) {
        if (!Objects.isNull(queryList((Map<String, Object>) new HashMap<>().put("wagesId", wagesId)))) {
            return 1;
        }
        return 0;
    }

    @Override
    public int updateWages(Map<String, Object> map) {
        return wagesDao.updateWages(map);
    }

    @Override
    public List<Map> stsatisThisYear() {
        return wagesDao.stsatisThisYear();
    }

    @Override
    public List<Map> stsatisThisMonth(Map<String, Object> map) {
        return wagesDao.stsatisThisMonth(map);
    }

    @Transactional(readOnly = false)
    @Override
    public int calculateWageById(Integer wageId) {
        wagesDao.calculateWageById1(wageId);
        wagesDao.calculateWageById2(wageId);
        wagesDao.calculateWageById3(wageId);
        wagesDao.calculateWageById4(wageId);
        wagesDao.calculateWageById5(wageId);
        wagesDao.calculateWageById6(wageId);
        return 1;
    }
}
