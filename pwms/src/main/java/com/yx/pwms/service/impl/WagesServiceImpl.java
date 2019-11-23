package com.yx.pwms.service.impl;

import com.yx.pwms.dao.WagesDao;
import com.yx.pwms.entity.Wages;
import com.yx.pwms.service.WagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class WagesServiceImpl implements WagesService {

    @Autowired
    private WagesDao wagesDao;

    @Override
    public int insertWages(Map<String, Object> map) {
        return wagesDao.insertWages(map);
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
    public Map<String, Object> queryMy(Map<String, Object> map) {
        return wagesDao.queryMy((String) map.get("employeeId"));
    }

    @Override
    public int queryExist(Integer wagesId) {
        if (!Objects.isNull(queryList((Map<String, Object>) new HashMap<>().put("wagesId",wagesId)))){
            return 1;
        }
        return 0;
    }

    @Override
    public int updateWages(Map<String, Object> map) {
        return wagesDao.updateWages(map);
    }
}
