package com.yx.pwms.service.impl;

import com.yx.pwms.dao.PositionsDao;
import com.yx.pwms.entity.Positions;
import com.yx.pwms.service.PositionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PositionsServiceImpl implements PositionsService {

    @Autowired
    private PositionsDao positionsDao;
    @Override
    public int insertPositions(Positions position) {
        return positionsDao.insertPositions(getMap(position));
    }

    @Override
    public int delPositions(String positionId) {
        return positionsDao.delPositions(positionId);
    }

    @Override
    public List<Positions> queryAll() {
        return positionsDao.queryAll();
    }

    @Override
    public Positions queryByPositionsId(String positionId) {
        return positionsDao.queryByPositionsId(positionId);
    }

    @Override
    public int queryExist(String positionId) {
        if (positionsDao.queryByPositionsId(positionId) != null){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int updatePositions(Positions position) {
        return positionsDao.updatePositions(getMap(position));
    }
    private Map<String, Object> getMap(Positions position){
        Map<String, Object> map = new HashMap<>();
        map.put("positionId",position.getPositionId());
        map.put("departmentId",position.getDepartmentId().getDepartmentId());
        map.put("positionName",position.getPositionName());
        map.put("positionBasePay",position.getPositionBasePay());
        return map;
    }
}
