package com.yx.pwms.dao;

import com.yx.pwms.entity.RewardAndPunishment;

import java.util.List;
import java.util.Map;

public interface RewardAndPunishmentDao {

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
    int deleteRewardAndPunishment(String serialNumber);

    /**
     * description: 查询多个
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    List<RewardAndPunishment> queryList(Map<String, Object> map);

    /**
     * description: 查询根据流水号
     * @params String employeeId
     * @return Employee
     */
    RewardAndPunishment queryBySerialNumber(String serialNumber);

    /**
     * description: 查询根据工号
     * @params String employeeId
     * @return Employee
     */
    RewardAndPunishment queryByemployeeId(String employeeId);

    /**
     * description: 信息更新
     * @params Map<String, Object> map
     * @return int
     */
    int updateRewardAndPunishment(Map<String, Object> map);
}
