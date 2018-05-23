package com.fleetit.api;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.springframework.http.HttpStatus;

public class StepDefsCucumberTest extends SpringCucumberTest{
	@When("^the client calls /api/v1/stats$")
	public void the_client_issues_GET_version() throws Throwable{
	    executeGet("http://127.0.0.1:8080/api/v1/stats");
	}

	@Then("^the client receives status code of (\\d+)$")
	public void the_client_receives_status_code_of(int statusCode) throws Throwable {
	    HttpStatus currentStatusCode = latestResponse.getTheResponse().getStatusCode();
	    assertThat("status code is incorrect : "+ latestResponse.getBody(), currentStatusCode.value(), is(statusCode));
	}

	@And("^the client receives the stats$")
	public void the_client_receives_server_version_body() throws Throwable {
	    assertThat(latestResponse.getBody(), notNullValue());
	}

	@When("^the client calls /api/v1/bike/(\\d+)/stats$")
	public void the_client_issues_GET_version(int id) throws Throwable{
	    executeGet("http://127.0.0.1:8080/api/v1/bike/"+id+"/stats");
	}

	@Then("^the client receives the stats of bike (\\d+)$")
	public void the_client_receives_server_version_body(int id) throws Throwable {
	    assertThat(latestResponse.getBody(), notNullValue());
	}

    @And("^the client receives the stats of bike$")
    public void the_client_receives_the_stats_of_bike() throws Throwable {
	    assertThat(latestResponse.getBody(), notNullValue());
    }

	@When("^the client calls /api/v1/bike/(\\d+)/last/(\\d+)$")
	public void the_client_issues_GET_version(int id, int days) throws Throwable{
	    executeGet("http://127.0.0.1:8080/api/v1/bike/"+id+"/last/"+days);
	}

	@Then("^the client receives the stats from the last (\\d+) days of bike (\\d+)$")
	public void the_client_receives_server_version_body(int days, int id) throws Throwable {
	    assertThat(latestResponse.getBody(), notNullValue());
	}

    @And("^the client receives the stats from the last (\\d+) days of bike$")
    public void the_client_receives_the_stats_from_the_last_days_of_bike(int arg1) throws Throwable {
	    assertThat(latestResponse.getBody(), notNullValue());
    }
}
