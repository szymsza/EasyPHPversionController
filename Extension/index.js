// Load current version
getCurrentVersion();

$('input').change(function() {
    if($(this).is(":checked"))
        turnOnServer("704vc14");
    else
    	turnOnServer("5619vc11");     
});

function getCurrentVersion() {
	$.ajax("http://127.0.0.1:1111/index.php?zone=applications&page=httpserver&serverfolder=apache2418vc11x86x160911194822", {
		type: "post"
	}).done(function(d) {
		var currentVersion = $(d).find("kbd:first-of-type").text();
		$("#current").text(currentVersion);
		if (currentVersion == "7.0.4 x86")
			$("input").prop("checked", true);
		else if (currentVersion != "5.6.19 x86")
			$("#current").text("VYPNUTO");
		$(".loading").hide();
	});
}

function turnOffServer(after) {
	$.ajax("http://127.0.0.1:1111/index.php?zone=applications&amp;page=httpserver&amp;serverfolder=apache2418vc11x86x160911194822", {
		type: "post",
		data: {
			"action[request][0][type]": "exe",
			"action[request][0][value]": "eds-app-stop.exe+-accepteula+%22eds-httpserver%22"
	    }
	}).done(after);
}

function turnOnServer(version) {
	$(".loading").show();
	turnOffServer(function() {
		$.ajax("http://127.0.0.1:1111/index.php?zone=applications&amp;page=httpserver&amp;serverfolder=apache2418vc11x86x160911194822", {
			type: "post",
			data: {
				"action[variable][server_folder]": "apache2418vc11x86x160911194822",
				"action[request][0][type]": "include",
				"action[request][0][value]": "..%2Feds-binaries%2Fhttpserver%2Fapache2418vc11x86x160911194822%2Feds-app-actions.php",
				"action[request][1][type]": "exe",
				"action[request][1][value]": "eds-app-launch+%22..%5Ceds-binaries%5Chttpserver%5Capache2418vc11x86x160911194822%5Cbin%5Ceds-httpserver.exe%22",
	    	
	    		"action[variable][php_folder]": "php"+version+"x86x160911194822",
	    		"action[variable][server_port]": "80",
	    	}
		}).done(getCurrentVersion);
	});
}