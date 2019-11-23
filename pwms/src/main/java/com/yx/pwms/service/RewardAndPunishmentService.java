package com.yx.pwms.service;

import com.yx.pwms.entity.RewardAndPunishment;

import java.util.List;
import java.util.Map;

public interface RewardAndPunishmentService {
    /**
     * description: 添加
     *
     * @params Map<String, Object> map
     * @return int
     */
    int insertRewardAndPunishment(Map<String, Object> map);

    /**
     * description: 删除
     * @params String employeeId
     * @return int
     */
    int deleteRewardAndPunishment(long serialNumber);

    /**
     * description: 查询
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    List<RewardAndPunishment> queryList(Map<String, Object> map);

    /**
     * description: 查询奖罚
     * @params String employeeId, Date date
     * @return Employee
     */
    List queryForRAP(Map<String, Object> map);

    int queryExist(String serialNumber);

    /**
     * description: 更新
     * @params Map<String, Object> map
     * @return int
     */
    int updateRewardAndPunishment(Map<String, Object> map);
}
