package com.yx.pwms.service;

import com.yx.pwms.entity.Positions;

import java.util.List;
import java.util.Map;

public interface PositionsService {
    /**
     * description: 添加职位
     * @params Positions position
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
     * description:
     * @params String departmentId
     * @return int
     */
    int queryExist(String positionId);

    /**
     * description: 更新职位信息
     * @params Positions position
     * @return int
     */
    int updatePositions(Positions position);
}
