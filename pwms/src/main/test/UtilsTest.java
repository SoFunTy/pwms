import com.yx.pwms.utils.MD5Util;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UtilsTest {
    private String str1 = "123456";
    @Test
    public void MD5UtilTest(){
        System.out.println(MD5Util.MD5Encode(str1,"UTF-8"));
    }
}
