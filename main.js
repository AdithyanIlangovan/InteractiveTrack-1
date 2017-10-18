	// <----------- Global variables to be accessed by all the functions in common ----------------->

        startUpFunction();
    
	var vid = document.getElementById("video"); // Get the <video> element with id="myVideo"
	
	
	var image_start  = [2.0,  6, 15.25, 22, 32];
	var image_end	 = [4.5, 10, 18.50, 25, 34];

	var new_image_available = 0;	    // Store in the local variable tells there is a state change : (new image available )
	var new_function_available = 0;	    // Store in the local variable tells there is a state change : (new image available )

	var prev_state_left_thumbnail = 0;  // The state variable that indicates that keeps previous state of the leftthumbnail
	var video_end_boundary_prev = 0;    // The state variable that indicates the whether we have crossed the (video_end - 5 seconds) boundary.
	var blobUrl; 			   //  The URL for pointing to the javascript.
	var function_added = 0;
	// <----------- Main functions ----------------->
	
	function startUpFunction() {	 
	  // Execture on startup.
	  setInterval(checkForLeftThumbnail, 100); // Every 100ms check any new information for left thumbnail arrived or not.
	  setInterval(checkForRightThumbnail, 100); // Every 100ms check any new information for right thumbnail arrived or not.
	}

	function checkForLeftThumbnail(){
	  // Periodically execute (100ms) and see if new left thumbnail is available. 
	  // If yes, then read this from the local storage and set it in the HTML page.
	    if (new_image_available){
		setLeftActorInfoOverlay(); // Read the information and set it in the HTML page.
		new_image_available = 0;   // Reintialize the variable.
	    }
	}

	function checkForRightThumbnail(){
	  // Periodically execute (100ms) and see if new left thumbnail is available. 
	  // If yes, then read this from the local storage and set it in the HTML page.
	    if (new_function_available && !function_added){
		var script = document.createElement('script');
		script.type = 'text/javascript';          
		script.src = blobUrl;
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(script);
		function_added = 1;
		console.log("Function added");
	    }
	}
	
	function setLeftActorInfoOverlay() {
	  // Display the image and also the url for the image.
	  // The image is read from the localstorage with the key "link_for_actorinfo"
	  // The image is read from the localstorage with the key "link_for_image"
	  var link_for_image = localStorage.getItem('link_for_image');
	  var link_for_actorinfo = localStorage.getItem('link_for_actorinfo');
	  console.log('Starting process 2. Reading from local storage (URL and images) and setting at corresonding part in HTML.');
	  if (link_for_image == "null"){  
	    document.getElementById("img").src = "";
	    document.getElementById("links").href = "";  
	    document.getElementById("links_text").innerHTML = "";  
	  }
	 else{
	    document.getElementById("img").src = link_for_image;
	    document.getElementById("links").href = link_for_actorinfo;
	    document.getElementById("links_text").innerHTML = "Know more about me";  
	 }
	}
	
	function storeUrlAndLink(pos) {	 
	  // Emulates periodic reading of interactive track of URL information. 
	  // We assume this information is somehow read from the interactive track.
	  // And this information is stored in local storage for later processing by some other element.
	  var images = []
	  var links  = [];
	  
	  
	  images[0] = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/actor1.jpg";           
	  images[1] = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/actor2.jpg";	    
	  images[2] = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/actor2.jpg";
	  images[3] = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/actor4.jpg";
	  images[4] = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/actor3.jpg";
	  
	  links[0]  = "http://www.imdb.com/name/nm4495815/?ref_=ttfc_fc_cl_t4";
	  links[1]  = "http://www.imdb.com/name/nm3316142/?ref_=ttfc_fc_cl_t2";
	  links[2]  = "http://www.imdb.com/name/nm3316142/?ref_=ttfc_fc_cl_t2";
	  links[3]  = "http://www.imdb.com/name/nm1851201/?ref_=tt_cl_t3";
	  links[4]  = "http://www.imdb.com/name/nm0513190/?ref_=ttfc_fc_cl_t1";
	  
	  
	  if (!pos){	     
	    console.log("Emulating process 1. Storing the URL and images in local storage.");
	    console.log("No image or link received. ");
	    localStorage.setItem('link_for_image', "null"); // I do not want to display anything.
	    localStorage.setItem('link_for_actorinfo', "null"); // I do not want to display anything.
	  }
	  else {
	    console.log("Emulating process 1. Storing the URL and images in local storage.");
	    console.log("Storing image : " + images[pos-1]);
	    console.log("Storing current link : " + links[pos-1]);
	    localStorage.setItem('link_for_image', images[pos-1]);
	    localStorage.setItem('link_for_actorinfo', links[pos-1]);
	  }
	}

	function storeFunction() {	 
	  // Emulates periodic reading of interactive track of javascript function information.
	  // We assume this information is somehow read from the interactive track.
	  // And this information is stored in local storage for later processing by some other element.
	    
	  // We create a sample javascript file. Store into blob. Get a URL to this blob. Read the content from blob.
	  // And append this content to the headelement in runtime.
	  // document.getElementById("video").style.width= "50%" ;' +

	    var string =  'function setRightVideoSuggestion() {' +
				    "document.getElementById('video').style.width 	= '50%';" +  
				    "document.getElementById('video').style.width 	= '50%';" +
				    "document.getElementById('video').style.position	= 'absolute';" +
				    "document.getElementById('video').style.bottom 	= '25%';" +
				    "document.getElementById('video').style.left 	= '5%';" +
				    "document.getElementById('video').style.opacity 	= '1.0';" +   
				    'console.log("Calling before video ends function");' +
				    'document.getElementById("video_end_text").innerHTML = "You may be also interested in" ;' + 
				    'document.getElementById("img_2").src = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/sintel.jpg";' + 
				    'document.getElementById("links_2").href = "https://www.youtube.com/watch?v=eRsGyueVLvQ";' +  
				    'document.getElementById("link_1_end").innerHTML = "Watch here" ;' +
				    'document.getElementById("img_3").src = "https://raw.githubusercontent.com/AdithyanIlangovan/InteractivityTrackImages/master/bbb.png";' +
				    'document.getElementById("links_3").href = "https://www.youtube.com/watch?v=YE7VzlLtp-4";' +
				    'document.getElementById("link_2_end").innerHTML = "Watch here" ;}'; 
	    var myBlob = new Blob([string], {type : "text/javascript"});
	    blobUrl = window.URL.createObjectURL(myBlob);

      }
         
	function emulateReceiveAndStoreFunction() {	
	  // This function will be executed everytime there is a change in playback position.
	  // Then we check with statemachine (a very simple one!) to check whether we have crossed the boundaries. 
	  // If yes, call the apporiate functions and set the apporiate elements within the style sheet.  
	  
	  if (!function_added){	// Call it only once.
	    var video_end_boundary;	// The state variable that indicates the whether we have crossed the (video_end - 5 seconds) boundary.
	    video_end_boundary = (vid.duration - vid.currentTime) < 5 ? 1 : 0;
	    
	    if (video_end_boundary != video_end_boundary_prev){ // state machine to keep track whether it crossed the boundary		    
		storeFunction();
		new_function_available = 1;
		console.log("Function stored");
		video_end_boundary = !video_end_boundary;
	    }
	    video_end_boundary_prev = video_end_boundary;	    
	  }
	}
	
	function addRemoveRightThumbnail(){
	  if (function_added){
		console.log("Adding/Removing thumbnail");
		var video_end_boundary;	// The state variable that indicates the whether we have crossed the (video_end - 5 seconds) boundary.
		video_end_boundary = (vid.duration - vid.currentTime) < 5 ? 1 : 0;

		if (video_end_boundary != video_end_boundary_prev){		
		  if (video_end_boundary)
		    setRightVideoSuggestion();
		  else 
		    removeVideoSuggestionThumbnails();		
		}
		video_end_boundary_prev = video_end_boundary;	        
	    }		
	}
	
	function emulateReceiveAndStoreLeftThumbnail(){
	  // Emulates process 1 - Storings information into the local storage for later reading.
	  // Ideally it is expected that later, this process will be replaced by actual reception of date from samples and storing them in real-time.
	  var state = identifyCurrentPosition(vid.currentTime);  
	  if (state != prev_state_left_thumbnail) { 
	  // change the source images if only these is  a change in the state when compared to the previous.
	  // at the same time trigger, two things happen simulatenously:
		console.log("Switching to state : " + state);	
		storeUrlAndLink(state);
		new_image_available = 1;
		prev_state_left_thumbnail = state;
	    }	  	
	}

	function removeVideoSuggestionThumbnails(){

	document.getElementById("video_end_text").innerHTML = "" ;
	document.getElementById("img_2").src = "";
	document.getElementById("links_2").href = "";	  
	document.getElementById("link_1_end").innerHTML = "" ;

	document.getElementById("img_3").src = "";
	document.getElementById("links_3").href = "";	  
	document.getElementById("link_2_end").innerHTML = "" ;

	document.getElementById('video').style.width 	= '100%';
	document.getElementById('video').style.height 	= 'auto';
	document.getElementById('video').style.position	= 'absolute';
	document.getElementById('video').style.bottom 	= 'initial';
	document.getElementById('video').style.left 	= 'initial';
	document.getElementById('video').style.opacity 	= '1.0';
	}

	// <----------- Event triggers ----------------->
	
	vid.ontimeupdate = function() {
	  emulateReceiveAndStoreFunction(); 
	  emulateReceiveAndStoreLeftThumbnail(); 
	  addRemoveRightThumbnail();
	  
	}; 

	
	// <---------- Helper functions ---------------->
	
	function identifyCurrentPosition(time){
	  // w.r.t to the image_start and image_end variables defined earlier
	  // this functions tell us if we are one of the ranges
	  // returns 0 if the present time is in none of the locations.	 
	  var loc = 0;
	  for (var i = 0; i < image_start.length; i++){
	    if (time.between(image_start[i], image_end[i])){
	      loc = i+1;
	    }
	  }
	  return loc;
	}

	
	Number.prototype.between = function (min, max) {
	  // Helper function to find whether between two values. 
	  return this > min && this < max;
	};
	
	// Use this if you want the internal media controller firing engine reponse to trigger, when you want to call the function.
    
	function testadd(){
        //console.log("Test works!!!");
        }