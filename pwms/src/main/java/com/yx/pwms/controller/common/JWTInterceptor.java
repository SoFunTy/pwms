package com.yx.pwms.controller.common;

import com.yx.pwms.utils.JWTUtils;
import io.jsonwebtoken.Claims;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JWTInterceptor implements HandlerInterceptor {

    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
        // TODO Auto-generated method stub

    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) {
        JWTUtils util = new JWTUtils();
        String jwt = request.getHeader("Authorization").substring(7);
        System.out.println(jwt);
        try {
            if (jwt == null) {
                System.out.println("用户未登录，验证失败");
            } else {
                Claims c;
                c = util.parseJWT(jwt);
                System.out.println("用户id" + c.get("employeeId") + "已是登录状态");
                return true;
            }
            response.sendRedirect("/pwms/");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }

}