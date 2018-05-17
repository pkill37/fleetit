import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;

import com.fleetit.api.Application;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApiIntegrationTest {
	@LocalServerPort
	private int port;
	TestRestTemplate restTemplate = new TestRestTemplate();
	HttpHeaders headers = new HttpHeaders();

	@Test
	public void testRetrieveStats() throws JSONException {
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);

		ResponseEntity<String> response = restTemplate.exchange(createURLWithPort("/api/v1/stats"), HttpMethod.GET, entity, String.class);

        JSONObject json = new JSONObject(response.getBody());

        Assert.assertEquals(json.has("bikeId"), true);
        Assert.assertEquals(json.has("timestamp"), true);
        Assert.assertEquals(json.has("lat"), true);
        Assert.assertEquals(json.has("lng"), true);
        Assert.assertEquals(json.has("temp"), true);
        Assert.assertEquals(json.has("heartRate"), true);
        Assert.assertEquals(json.has("battery"), true);
        Assert.assertEquals(json.has("speed"), true);
	}

	private String createURLWithPort(String uri) {
		return "http://127.0.0.1:8080" + uri;
	}
}
