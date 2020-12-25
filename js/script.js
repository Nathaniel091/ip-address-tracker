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
	const API_KEY = `at_gbWW54UOrZHguQsCgMxbW0MKTeGRF`;
	const defaultUrl = `https://geo.ipify.org/api/v1?apiKey=at_gbWW54UOrZHguQsCgMxbW0MKTeGRF&ipAddress=`;

	// Form details
	const searchBox = document.getElementById('search-box');
	const submitButton = document.getElementById('submit-button');

	// Other details that will be updated with javascript
	const IP_details = document.getElementById('IP-details');
	const location_details = document.getElementById('location-details');
	const timezone_details = document.getElementById('timezone-details');
	const ISP_details = document.getElementById('ISP-details');

	// On load
	fetch(defaultUrl)
		.then((response) => response.json())
		.then((data) => {
			let lat = data.location.lat;
			let lng = data.location.lng;
			let googlemapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
			// let googlemapUrl = `https://www.google.com/maps/place/50%C2%B006'14.0%22N+8%C2%B038'57.0%22E/@${lat},${lng},17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d50.1039!4d8.64917`;
			let mapFrame = document.getElementById("map-frame")
			

			// let latLng = 50.1039,8.64917;



			// mapFrame.setAttribute('src', googlemapUrl)
			console.log(mapFrame)

			IP_details.textContent = `${data.ip}`;
			location_details.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
			timezone_details.textContent = `${data.location.timezone}`;
			ISP_details.textContent = `${data.isp}`;

		});


	// On form submission
	submitButton.addEventListener("click", (event)=> {
		event.preventDefault();
		const searchValue = searchBox.value;
		const url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${searchValue}`;
	
		if (searchValue === "") {
			let warning = document.getElementById('warning');
			warning.textContent = `WARNING: `;
		} else {
			fetch(url)
  				.then((response) => response.json())
  				.then((data) => {
    					IP_details.textContent = `${data.ip}`;
    					location_details.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
    					timezone_details.textContent = `${data.location.timezone}`;
    					ISP_details.textContent = `${data.isp}`;
  				});
		}
	});
});
