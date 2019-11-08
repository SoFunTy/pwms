package com.yx.pwms.service.impl;

import com.yx.pwms.dao.NoticesDao;
import com.yx.pwms.entity.Notices;
import com.yx.pwms.service.NoticesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * @author ：xubi
 * @date ：Created in 2019/11/8 上午11:34
 */
@Service
public class NoticesServiceImpl implements NoticesService {

    @Autowired
    private NoticesDao noticesDao;

    @Override
    public int insertNotices(Map<String, Object> map) {
        return noticesDao.insertNotices(map);
    }

    @Override
    public int deleteNotices(long noticesId) {
        return noticesDao.deleteNotices(noticesId);
    }

    @Override
    public List<Notices> queryList(Map<String, Object> map) {
        return noticesDao.queryList(map);
    }

    @Override
    public Notices queryBy(Map<String, Object> map) {
        return noticesDao.queryBy(map);
    }

    @Override
    public int queryExist(String noticesId) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("noticesId",noticesId);
        if (!Objects.isNull(queryBy(map))){
            return 1;
        }
        return 0;
    }

    @Override
    public int updateNotices(Map<String, Object> map) {
        return noticesDao.updateNotices(map);
    }
}
