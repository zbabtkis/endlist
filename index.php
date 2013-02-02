<!DOCTYPE HTML>
<?php //include('includes.php'); ?>

<html lang='en'>
<head> 
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<link rel='stylesheet' type='text/css' href='css/endlist.css'>
	<script src="libraries/jquery-1.9.0-min.js" type="text/javascript"></script>
	<script src="libraries/jquery-masonry-2.1.07.min.js" type="text/javascript"></script>
	<script src="libraries/jquery-ui-1.10.0.custom.min.js" type="text/javascript"></script>
	<script src="libraries/1-underscore-1.4.3-min.js" type="text/javascript"></script>
	<script src="libraries/backbone-0.9.10-min.js" type="text/javascript"></script>
	<script src="js/app.settings.js" type="text/javascript"></script>
	<script src="js/Model.js" type="text/javascript"></script>
	<script src="js/Collections.js" type="text/javascript"></script>
	<script src="js/View.js" type="text/javascript"></script>
	<script src="js/app.js" type="text/javascript"></script>

	<script type="text/javascript" src="http://platform.linkedin.com/in.js">/*
	  api_key: 89gqf527v6qv
	  onLoad: onLinkedInLoad
	  authorize: true
	  scope: r_fullprofile r_emailaddress r_contactinfo
	*/</script>

	<script type="text/javascript">
	  // 2. Runs when the JavaScript framework is loaded
	  function onLinkedInLoad() {
	    IN.Event.on(IN, "auth", onLinkedInAuth);
	  }

	  // 2. Runs when the viewer has authenticated
	  function onLinkedInAuth() {
	    IN.API.Profile("me").fields("id,firstName,lastName,skills,main-address").result(displayProfiles);
	  }

	  // 2. Runs when the Profile() API call returns successfully
	  function displayProfiles(profiles) {
	    window.CApp.accounts.add(profiles.values[0]);
	  }
	</script>
</head>
<body>
<div id='wrapper'>
	<header>
	</header>
	<nav id='nav'>
		<ul></ul>
	</nav>
	<div id='content'>
		<ul></ul>
	</div>
</div>
</body>
</html>