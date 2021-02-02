

// current year for copyright text
currentYear()
function currentYear() {
	let currentYear = new Date().getFullYear()
	let copyright = document.getElementById('copyright')
	copyright.textContent += ` ${currentYear}`
}


// ipifyAPI_URL = `https://geo.ipify.org/api/v1?apiKey=at_gbWW54UOrZHguQsCgMxbW0MKTeGR&ipAddress=`; // if the "ipAdress=" parameter is empty, the API request is made with the user's IP adress.
// ===================================================================================================
	// API details
	// googleMapsEmbed
	const googleMapsEmbed_API_KEY = `AIzaSyBL_nzHgULHBN9BACCmABwpR1IwWK27fvw`;
	// ipify details
	const ipify_API_KEY = `at_gbWW54UOrZHguQsCgMxbW0MKTeGRF`;
	let ipAddress = "";

	// Form details
	const submitButton = document.getElementById('submit-button')
	const searchBox = document.getElementById('search-box');
	const searchValue = searchBox.value;

	// Other details that will be updated with javascript
	const IP_details = document.getElementById('IP-details');
	const location_details = document.getElementById('location-details');
	const timezone_details = document.getElementById('timezone-details');
	const ISP_details = document.getElementById('ISP-details');

	// iframe
	const map_Iframe = document.getElementById("map-frame");

	// Loading animation
	const animation = document.getElementById('animation');
	// Output for all warning & error text/message
	const warning = document.getElementById('warning');
	const warningText = {
		pleaseWait: "please wait...",
		disclaimerText: "Disclaimer: 'Data on this website may not be very accurate'",
		emptyStringText: "Invalid Input",
		defaultText: "Invalid: Ipv4 address is a combination of [ONLY!] numbers(i.e digits) and periods(.)",
	};
//==============================================================================================


// After page is loaded ==============================
window.addEventListener('load', pageLoaded);

function pageLoaded() {
	warning.textContent = warningText.pleaseWait;
	// add loading animation
	animation.classList.remove("d-none");
	// then add a progres cursor
	if (warning.textContent = warningText.pleaseWait){
		warning.style.cursor = 'progress';
	}

	// then call the fetchAPI() function
	fetchAPI();
}

// function fetchAPI()
function fetchAPI() {
	// ipify API url
	const ipifyAPI_URL = `https://geo.ipify.org/api/v1?apiKey=${ipify_API_KEY}&ipAddress=${ipAddress}`

	fetch(ipifyAPI_URL)
		.then(handleResponse)
		.then((data) => {
			let lat = data.location.lat;
			let lng = data.location.lng;

			// set iframe's URL
			let map_IframeUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsEmbed_API_KEY}&q=${lat},${lng}&center=${lat},${lng}&zoom=5&maptype=satellite`;
			map_Iframe.setAttribute('src', map_IframeUrl);

			//after iframe URL has been set, then set warnig text back to initial and hide the animation;
			warning.textContent = warningText.disclaimerText;
			animation.classList.add("d-none");

			// display the details to the webpage
			IP_details.textContent = `${data.ip}`;
			location_details.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
			timezone_details.textContent = `${data.location.timezone}`;
			ISP_details.textContent = `${data.isp}`;
		})
		.catch((error) => {
			let statusCode = error.status;
			// if error.status does not exist
			if(typeof(error.status) !== "number") {
				statusCode = error.code;
			}

			let message = error.messages;
			// if error.messages does not exist
			if(error.err){
				message = error.err;
				// .err is returned from the API sometimes
			}
			// if error.err does not exist
			if(error.message) {
				message = error.message;
				// .message is browser in-built
			}

			// change the cursor
			warning.style.cursor = 'help';
			// stop the animation, change the text color to yellow & output the error and error message
			animation.classList.add("d-none");
			warning.classList.add("text-warning");
			// warning.textContent = `error! ${statusCode} ${error.statusText} \n MESSAGE: ${message}`;
			warning.innerHTML = `error! ${statusCode} ${error.statusText}. 
							<br>
			 				<span style="color:white;">message: '${message}'</span>`;
			warning.style.lineHeight = '20px';
		})
}

// function handleResponse()
function handleResponse(response) {
 	let contentType = response.headers.get('content-type')
  	if (contentType.includes('application/json')) {
    		return handleJSONResponse(response)
  	} else if (contentType.includes('text/html')) {
    		return handleTextResponse(response)
  	} else {
    		// Other response types as necessary. I haven't found a need for them yet though.
    		// throw new Error(`Sorry, content-type ${contentType} not supported`)
    		Promise.reject(`Sorry, content-type ${contentType} not supported`)
  	}
}

// function handleJSONResponse()
function handleJSONResponse(response) {
	return response.json()
    .then((json) => {
     	if (response.ok) {
        		return json
      	} else {
        		return Promise.reject(Object.assign({}, json, {
          		status: response.status,
          		statusText: response.statusText
        		}));
      	}
    })
}

// function handleTextResponse()
function handleTextResponse(response) {
  	return response.text()
    .then(text => {
      	if (response.ok) {
        		return text
      	} else {
	     	return Promise.reject({
	     		status: response.status,
	          	statusText: response.statusText,
	          	err: text
	        	})
      	}
    })
}


// When Form is submitted============================================================
submitButton.addEventListener("click", function(event) {
	event.preventDefault()

	document.querySelector("#ip-address-container small").textContent = "IP ADDRESS";

	// change "ipAddress" to the user's input (i.e searchValue)
	const searchValue = searchBox.value;
	ipAddress = searchValue

	// then call the "filterTestPassed" function to take over
	filterTestPassed(searchValue)
});

// function filterTestPassed()
function filterTestPassed(searchValue) {
	// GOAL: "The goal is for the string to contain only numbers and dots(.) nothing else, not even whitespaces"
	// GOAL: "Anything else is a fail"

	// regular expressions
	const regexOnlyBeginningAndEndWhiteSpace = /([\s\b]|[\b\s])/g // matches all white spaces at the beginning & ending of the searchValue
	const regexOnlyNumberAndPeriods = /[^0-9.]/g; // matches any character that is (or returns "true" if a character is) NOT a number(digit) or dot(.)
	
	// removes all whitespaces at the start & end of the searchValue
	let modifiedSearchValue = searchValue.replace(regexOnlyBeginningAndEndWhiteSpace, "");

	// Let warningText color turn to yellow
	warning.classList.add("text-warning");

	if(modifiedSearchValue === "") {
		warning.textContent = warningText.emptyStringText;
	} else if(regexOnlyNumberAndPeriods.test(modifiedSearchValue)) {
		warning.textContent = warningText.defaultText;
	} else {
	 	// all tests has been passed, So?
	 	warning.classList.remove("text-warning");
	 	warning.textContent = warningText.pleaseWait;
	 	animation.classList.remove("d-none")
		fetchAPI()
	}
};


// The End




