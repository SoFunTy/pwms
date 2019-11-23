package com.yx.pwms.service;

import com.yx.pwms.entity.Notices;

import java.util.List;
import java.util.Map;

public interface NoticesService {
    /**
     * description: 添加
     *
     * @params Map<String, Object> map
     * @return int
     */
    int insertNotices(Map<String, Object> map);

    /**
     * description: 删除
     * @params String employeeId
     * @return int
     */
    int deleteNotices(long noticesId);

    /**
     * description: 查询
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    List<Notices> queryList(Map<String, Object> map);

    /**
     * description: 查询
     * @params Map<String, Object> map
     * @return List<Employee>
     */
    Notices queryBy(Map<String, Object> map);

    int queryExist(String noticesId);
    /**
     * description: 更新
     * @params Map<String, Object> map
     * @return int
     */
    int updateNotices(Map<String, Object> map);
}
