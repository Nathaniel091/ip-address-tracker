// Problems that need fixing
// -----------------------------

// 1: searchBox is storing my search history(fix this) !!!



// if ("geolocation" in navigator) {
	// 	navigator.geolocation.getCurrentPosition(function(position) {
	// 		let lat = position.coords.latitude;
	// 		let lon = position.coords.longitude;

	// 		console.log( "lat " + lat, "|| long " + lon)
	// 		// console.log(position)
	// 	}, function(error) {
	// 		ipLookUp();
	// 	});
	// }else {
	// 	ipLookUp()
	// }
	// function ipLookUp() {
	// 	console.log('user refused ooo')
	// };


//  fetch('https://geo.ipify.org/api/v1?apiKey=at_gbWW54UOrZHguQsCgMxbW0MKTeGRF&ipAddress=8.8.8.8')
// .then(response => {
//     if (response.ok) {
//       return response.json()
//     } else {
//      return Promise.reject('something may have gone wrong!')
//     }
//   })
// .then(data => console.log('my data is:', data))
// .catch((error) => {
//   console.error('Error:-- ', error);
// });



window.addEventListener('load', (event) => {
	// API details
	const googleMapsEmbed_API_KEY = `AIzaSyBL_nzHgULHBN9BACCmABwpR1IwWK27fvw`;
	const ipify_API_KEY = `at_gbWW54UOrZHguQsCgMxbW0MKTeGRF`;
	const ipify_URL = `https://geo.ipify.org/api/v1?apiKey=${ipify_API_KEY}&ipAddress=`;

	// Form details
	const searchBox = document.getElementById('search-box');
	const submitButton = document.getElementById('submit-button');

	// Other details that will be updated with javascript
	const IP_details = document.getElementById('IP-details');
	const location_details = document.getElementById('location-details');
	const timezone_details = document.getElementById('timezone-details');
	const ISP_details = document.getElementById('ISP-details');

	// iframe
	const map_Iframe = document.getElementById("map-frame");

	// After page is loaded
	fetch(ipify_URL)
		.then((response) => response.json())
		.then((data) => {
			let lat = data.location.lat;
			let lng = data.location.lng;

			let map_IframeUrl = `https://www.google.com/maps/embed/v1/view?key=${googleMapsEmbed_API_KEY}&center=${lat},${lng}&zoom=5&maptype=satellite`;

			map_Iframe.setAttribute('src', map_IframeUrl)
			console.log(data)
			console.log(map_Iframe)


			IP_details.textContent = `${data.ip}`;
			location_details.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
			timezone_details.textContent = `${data.location.timezone}`;
			ISP_details.textContent = `${data.isp}`;
		});


	// On Form submission
	submitButton.addEventListener("click", (event)=> {
		event.preventDefault();
		const searchValue = searchBox.value;
		const ipify_URL2 = `https://geo.ipify.org/api/v1?apiKey=${ipify_API_KEY}&ipAddress=${searchValue}`;
	
		if (searchValue === "") {
			let warning = document.getElementById('warning');
			warning.textContent = `WARNING: `;
		} else {
			fetch(ipify_URL2)
  				.then((response) => response.json())
  				.then((data) => {
    					IP_details.textContent = `${data.ip}`;
    					location_details.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    					timezone_details.textContent = `${data.location.timezone}`;
    					ISP_details.textContent = `${data.isp}`;

    					let lat = data.location.lat;
					let lng = data.location.lng;
    					let map_IframeUrl = `https://www.google.com/maps/embed/v1/view?key=${googleMapsEmbed_API_KEY}&center=${lat},${lng}&zoom=5&maptype=satellite`;
					map_Iframe.setAttribute('src', map_IframeUrl)

  				});
		}
	});
});
