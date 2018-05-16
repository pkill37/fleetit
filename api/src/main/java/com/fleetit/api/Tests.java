package com.fleetit.api;

import org.junit.Test;
import java.sql.Timestamp;
import org.junit.Assert;
import com.fleetit.api.Update;

public class Tests {

	@Test
	public void testGlobalStats(){
		Assert.assertNotNull(ApiController.stats());
	}

	@Test
	public void testBikeStats(){
		Assert.assertNotNull(ApiController.stats(3895));
	}

	@Test
	public void testLastDaysOfBike(){
		Assert.assertNotNull(ApiController.last(3895,30));
	}
	
	@Test
	public void testUpdate() {
		String res = "Update{" + "bikeId=" +1+ ", timestamp=" +new Timestamp(1000)+ ", lat=" +25.1235+ ", lng=" +45.00+ ", co2=" +23+ ", temp=" +25.0+ 
            ", heartRate=" +85+ ", battery=" +86.0+ ", speed=" +46.2+ '}';
		Update up = new Update(1, new Timestamp(1000), 25.1235, 45.00, 23, 25.0, 85, 86.0, 46.2);
		Assert.assertEquals(up.toString(), res);
	}
}