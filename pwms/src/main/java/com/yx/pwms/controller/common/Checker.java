package com.yx.pwms.controller.common;

/**
 * @author ：xubi
 * @date ：Created in 2019/10/24 下午6:40
 */
public class Checker {
    /**
     * description: 添加、删除、更新成功判断
     *
     * @return Result
     * @params int statu
     */
    public static Result check(int statu) {
        Result result = ResultGenerator.genErrorResult(409,"error");
        if (statu != 0) {
            result = ResultGenerator.genSuccessResult();
        }
        return result;
    }

    /**
     * description: 查询成功判断
     *
     * @return Result
     * @params Object obj
     */
    public static Result check(Object obj) {
        Result result = ResultGenerator.genErrorResult(409,"error");
        if (obj != null) {
            result = ResultGenerator.genSuccessResult(obj);
        }
        return result;
    }
}
