package com.yx.pwms.controller.common;

/**
 * Created by 13 on 2017/6/26.
 */
public class Constants {

    public static final int RESULT_CODE_SUCCESS = 200;  // 成功处理请求
    public static final int RESULT_CODE_BAD_REQUEST = 412;  // 请求错误
    public static final int RESULT_CODE_NOT_LOGIN = 402;  // 未登录
    public static final int RESULT_CODE_LOGIN_ERROR  = 410;  // 账号或密码错误
    public static final int RESULT_CODE_PARAM_ERROR = 406;  // 传参错误
    public static final int RESULT_CODE_EXIST_ERROR = 407;  // 数据已存在
    public static final int RESULT_CODE_NOTEXIST_ERROR = 408;  // 数据不存在
    public static final int RESULT_CODE_SQL_ERROR = 409;  // 数据不存在
    public static final int RESULT_CODE_CHUNK_EXIST = 298;  // 自定义code 分片已存在
    public static final int RESULT_CODE_CHUNK_NOTEXIST = 299;  // 自定义code 分片不存在
    public static final int RESULT_CODE_SERVER_ERROR = 500;  // 服务器错误

}
