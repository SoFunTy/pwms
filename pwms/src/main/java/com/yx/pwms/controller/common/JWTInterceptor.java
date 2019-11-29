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
    }

    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
            throws Exception {
    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) {
        try {
            String jwt = request.getHeader("Authorization").substring(7);
            if (jwt == null) {
                response.sendRedirect("/pwms/");
            } else {
                Claims c;
                c = JWTUtils.parseJWT(jwt);
                return true;
            }
            response.sendRedirect("/pwms/");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}