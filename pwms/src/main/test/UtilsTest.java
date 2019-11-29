import com.yx.pwms.utils.JWTUtils;
import com.yx.pwms.utils.MD5Util;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

public class UtilsTest {
    private String str1 = "123456";
    @Test
    public void MD5UtilTest(){
        System.out.println(MD5Util.MD5Encode(str1,"UTF-8"));

        String jwt = "";
        Map<String, Object> payload = new HashMap<String, Object>();
        payload.put("employeeId", "101003");
        SignatureAlgorithm s = SignatureAlgorithm.HS256;
        try {
            jwt = JWTUtils.createJWT("jwt", "", payload);
            System.out.println(jwt);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            JWTUtils.parseJWT("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJlbXBsb3llZUlkIjoiMTAxMDAzIiwiZXhwIjoxNTc0OTk0MDkwLCJpYXQiOjE1NzQ5OTA0OTAsImp0aSI6Imp3dCJ9.Tel2qZrdmMXjmRt64w8dmql2wKTT2ikQcKwiL4skkwM");
            System.out.println(JWTUtils.parseJWT(jwt).toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
