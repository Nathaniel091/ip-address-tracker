// - how to check if data connection is on
// - setTimeOut so that if theres no internet, it will stop loading
// - improve search pattern with regex
// - improve error message
// - if response !ok
// - catch errors and out put it to the "warning"

window.addEventListener('load', pageLoaded);



	// API details
	// googleMapsEmbed
	const googleMapsEmbed_API_KEY = `AIzaSyBL_nzHgULHBN9BACCmABwpR1IwWK27fvw`;
	// ipify
	const ipify_API_KEY = `at_gbWW54UOrZHguQsCgMxbW0MKTeGRF`;
	const ipifyAPI_URL = `https://geo.ipify.org/api/v1?apiKey=${ipify_API_KEY}&ipAddress=`; // if the "ipAdress=" parameter is empty, the API request is made with the user's IP adress.

	// Form and Search box details
	const searchBox = document.getElementById('search-box');
	const submitButton = document.getElementById('submit-button');

	// Other details that will be updated with javascript
	const IP_details = document.getElementById('IP-details');
	const location_details = document.getElementById('location-details');
	const timezone_details = document.getElementById('timezone-details');
	const ISP_details = document.getElementById('ISP-details');

	// iframe
	const map_Iframe = document.getElementById("map-frame");

	// Output for all warning & error text/message
	const warning = document.getElementById('warning');
	const warningText = {
		pleaseWait: "please wait...",
		disclaimerText: "Disclaimer: 'Data on this website may not be very accurate'",
		emptyStringText: "Invalid Input",
		defaultText: "Invalid: Ipv4 address is a combination of [ONLY!] numbers(i.e digits) and periods(.)",
	};
	// Loading animation
	const animation = document.getElementById('animation');
//===============================================================================================================


// After page is loaded
function pageLoaded() {
	async function myFetch() {
		// after page loads, display a loading animation;
		warning.textContent = warningText.pleaseWait;
		animation.classList.remove("d-none");

		// then fetch API and return json
		let response = await fetch(ipifyAPI_URL);
		return response.json();
	}
	myFetch().then((data) => {
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
	});
}

// On Form submission
submitButton.addEventListener("click", afterFormSubmitted);

function afterFormSubmitted(event) {
	// prevent detault execution 
	event.preventDefault();

	const searchValue = searchBox.value;

	// if test has been passed
	if (filterTestPassed(searchValue)) {
		let warning = document.getElementById('warning');
		fetchTheAPI();
	}	
}

// function filterTestPassed()
function filterTestPassed(searchValue) {
	// GOAL: "The goal is for the string to contain only numbers and dots(.) nothing else, not even whitespaces"
	// GOAL: "Anything else is a fail"

	// regular expressions
	const regexOnlyBeginningAndEndWhiteSpace = /([\s\b]|[\b\s])/g // matches white space only at the beginning & ending of the searchValue
	const regexOnlyNumberAndPeriods = /[^0-9.]/g; // matches any character that is (or returns "true" if a character is) NOT a number(digit) or dot(.)

	// removes all whitespaces at the start & end of the searchValue
	let modifiedSearchValue = searchValue.replace(regexOnlyBeginningAndEndWhiteSpace, "");
	//====================================================================

	
	// Let warningText color turn to yellow
	warning.classList.add("text-warning");

	if(modifiedSearchValue === ""){
		warning.textContent = warningText.emptyStringText;
	} else if(regexOnlyNumberAndPeriods.test(modifiedSearchValue)) {
		warning.textContent = warningText.defaultText;
	}else {
	 	// all tests has been passed, So?
	 	warning.classList.remove("text-warning");
	 	warning.textContent = warningText.pleaseWait;
	 	animation.classList.remove("d-none")
		return true; // do not delete
	}
}

//function fetchTheAPI()
function fetchTheAPI() {
	// declairing variables 
	const searchValue = searchBox.value;
	const ipifyAPI_URL2 = `https://geo.ipify.org/api/v1?apiKey=${ipify_API_KEY}&ipAddress=${searchValue}`;

	fetch(ipifyAPI_URL2)
		.then((response) => {
			if(response.ok) {
				return response.json()
			}
		})
		.then((data) => {
		console.log(data)

			IP_details.textContent = `${data.ip}`;
			location_details.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
			timezone_details.textContent = `${data.location.timezone}`;
			ISP_details.textContent = `${data.isp}`;

			let lat = data.location.lat;
		let lng = data.location.lng;

		// setURL for iframe
			let map_IframeUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsEmbed_API_KEY}&q=${lat},${lng}&center=${lat},${lng}&zoom=5&maptype=satellite`;
		map_Iframe.setAttribute('src', map_IframeUrl)
			
			// display a new text & remove the loading animation
		warning.textContent = "";
		animation.classList.add("d-none")
		})
		.catch((error) => {
			warning.classList.add("text-warning")
			warning.textContent = error;
			console.error("Error Here --->> ", error)
		});
}
// The End
