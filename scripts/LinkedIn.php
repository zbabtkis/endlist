<?php

// Fill the keys and secrets you retrieved after registering your app
$oauth = new OAuth("89gqf527v6qv", "rW9Fpc23NffGPlJG");
$oauth->setToken("49384e0d-505d-4bdc-93d3-02adfa5e1a6a", "0617e6cd-15af-4b6c-9863-93c3a08de8e3");
 
$params = array();
$headers = array();
$method = OAUTH_HTTP_METHOD_GET;
  
// Specify LinkedIn API endpoint to retrieve your own profile
$url = "http://api.linkedin.com/v1/people/~";
 
// By default, the LinkedIn API responses are in XML format. If you prefer JSON, simply specify the format in your call
// $url = "http://api.linkedin.com/v1/people/~?format=json";
 
// Make call to LinkedIn to retrieve your own profile
$oauth->fetch($url, $params, $method, $headers);
  
echo $oauth->getLastResponse();

?>