import com.yx.pwms.utils.JWTUtils;
import com.yx.pwms.utils.MD5Util;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

public class UtilsTest {
//    private String str1 = "123456";
//    @Test
//    public void MD5UtilTest(){
//        System.out.println(MD5Util.MD5Encode(str1,"UTF-8"));
//
//        String jwt = "";
//        Map<String, Object> payload = new HashMap<String, Object>();
//        payload.put("employeeId", "101003");
//        SignatureAlgorithm s = SignatureAlgorithm.HS256;
//        try {
//            jwt = JWTUtils.createJWT("jwt", "", payload);
//            System.out.println(jwt);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        try {
//            JWTUtils.parseJWT("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJlbXBsb3llZUlkIjoiMTAxMDAzIiwiZXhwIjoxNTc0OTk0MDkwLCJpYXQiOjE1NzQ5OTA0OTAsImp0aSI6Imp3dCJ9.Tel2qZrdmMXjmRt64w8dmql2wKTT2ikQcKwiL4skkwM");
//            System.out.println(JWTUtils.parseJWT(jwt).toString());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
    @Test
    public void SendEmailTest() throws Exception {
        com.ys.mail.EmailSenderUtils.sendEmial("2720717494@qq.com","<a href='http://www.baidu.com'>百度一下</a>");
    }
}
