<!DOCTYPE HTML>

<html lang='en'>
<head> 
	<meta name="apple-mobile-web-app-capable" content="yes" />
	
	<link href="img/icons/apple-touch-startup.png" media="(device-width: 320px)" rel="apple-touch-startup-image">
	<link href="img/icons/apple-touch-startup-iphone-retina.jpg" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
	<link href="apple-touch-startup-image-ipad-portrait.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
	<link href="apple-touch-startup-image-ipad-landscape.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">
	<link href="apple-touch-startup-image-ipad-portrait-retina.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
	<link href="apple-touch-startup-image-ipad-landscape-retina.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
	
	<link rel="apple-touch-icon" href="img/icons/apple-touch-icon-medium.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="img/icons/apple-touch-icon-medium.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="img/icons/apple-touch-icon-large.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<link rel='stylesheet' type='text/css' href='css/endlist.css'>
	<script src="libraries/jquery-1.9.0-min.js" type="text/javascript"></script>
	<script src="libraries/jquery-masonry-2.1.07.min.js" type="text/javascript"></script>
	<script src="libraries/jquery-ui-1.10.0.custom.min.js" type="text/javascript"></script>
	<script src="libraries/1-underscore-1.4.3-min.js" type="text/javascript"></script>
	<script src="libraries/backbone-0.9.10-min.js" type="text/javascript"></script>
	<script src="js/app.settings.json"></script>
	<script src="js/Model.js" type="text/javascript"></script>
	<script src="js/Collections.js" type="text/javascript"></script>
	<script src="js/View.js" type="text/javascript"></script>
	<script src="js/app.js" type="text/javascript"></script>

	<script type="text/javascript" src="http://platform.linkedin.com/in.js">/*
	  api_key: 89gqf527v6qv
	  onAuth: onLinkedInAuth
	  authorize: true
	  scope: r_fullprofile r_emailaddress r_contactinfo
	*/</script>

	<script type="text/javascript">
	  function onLinkedInAuth() {
	    IN.API.Profile("me").fields("id,firstName,lastName,skills,main-address").result(window.CApp.addAccount);
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