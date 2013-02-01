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
	<script src="js/View.js" type="text/javascript"></script></head>
	<script>
	function onLinkedInLoad() {
	     IN.Event.on(IN, "auth", login);
	}
	function login() {
		IN.API.Profile("me").result(showProfile);
	}
	function showProfile(me) {
		console.log('me');
		//window.CApp.accounts.add(new Account({info: me.values[0], network: 'linkedin'}));
	}
	</script>
	<script type="text/javascript" src="http://platform.linkedin.com/in.js">
	  	api_key: 89gqf527v6qv
	  	onLoad: onLinkedInLoad
	</script>
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