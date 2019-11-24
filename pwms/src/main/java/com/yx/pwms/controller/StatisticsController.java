package com.yx.pwms.controller;

import com.yx.pwms.controller.common.Checker;
import com.yx.pwms.controller.common.Result;
import com.yx.pwms.service.EmployeeService;
import com.yx.pwms.service.WagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author ：xubi
 * @date ：Created in 2019/11/22 上午9:18
 * @description：统计
 * @modified By：xubi
 * @version: $
 */

@Controller
@RequestMapping("/statis")
public class StatisticsController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private WagesService wagesService;

    @RequestMapping(value = "/sTheYear", method = RequestMethod.POST)
    @ResponseBody
    public Result statistics(){
        return Checker.check(wagesService.stsatisThisYear());
    }

}
