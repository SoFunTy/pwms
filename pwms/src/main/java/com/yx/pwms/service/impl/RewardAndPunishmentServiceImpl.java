package com.yx.pwms.service.impl;

import com.yx.pwms.dao.RewardAndPunishmentDao;
import com.yx.pwms.entity.RewardAndPunishment;
import com.yx.pwms.service.RewardAndPunishmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class RewardAndPunishmentServiceImpl implements RewardAndPunishmentService {

    @Autowired
    private RewardAndPunishmentDao rapDao;

    @Override
    public int insertRewardAndPunishment(Map<String, Object> map) {
        return rapDao.insertRewardAndPunishment(map);
    }

    @Override
    public int deleteRewardAndPunishment(long serialNumber) {
        return rapDao.deleteRewardAndPunishment(serialNumber);
    }

    @Override
    public List<RewardAndPunishment> queryList(Map<String, Object> map) {
        return rapDao.queryList(map);
    }

    @Override
    public List queryForRAP(Map<String, Object> map) {
        return rapDao.queryForRAP(map);
    }

    @Override
    public int queryExist(String serialNumber) {
        if (!Objects.isNull(queryList((Map<String, Object>) new HashMap<>().put("serialNumber",serialNumber)))){
              return 1;
        }
        else return 0;
    }

    @Override
    public int updateRewardAndPunishment(Map<String, Object> map) {
        return rapDao.updateRewardAndPunishment(map);
    }
}
