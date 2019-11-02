package com.yx.pwms.dao;

import com.yx.pwms.entity.Positions;

import java.util.List;
import java.util.Map;

/**
 * create by: xubi
 * create time: 2019-10-24
 */
public interface PositionsDao {
    /**
     * description: 添加职位
     * @params Map<String, Object> map
     * @return int
     */
    int insertPositions(Map<String, Object> map);

    /**
     * description: 删除职位
     * @params String positionId
     * @return int
     */
    int delPositions(String positionId);

    /**
     * description: 查询所有职位
     * @return List<Positions>
     */
    List<Positions> queryAll();

    /**
     * description: 查询职位通过职位编号
     * @params String positionId
     * @return Positions
     */
    Positions queryByPositionsId(String positionId);

    /**
     * description: 更新职位信息
     * @params Map<String, Object> map
     * @return int
     */
    int updatePositions(Map<String, Object> map);
}
