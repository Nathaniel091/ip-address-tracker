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



window.addEventListener('load', (event) => {
	// API details
	const API_KEY = `at_gbWW54UOrZHguQsCgMxbW0MKTeGRF`;
	// const url = `https://geo.ipify.org/api/v1?apiKey=at_gbWW54UOrZHguQsCgMxbW0MKTeGRF&ipAddress=8.8.8.8`;
	// const url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${searchBox.value}`;

	// Form details
	const searchBox = document.getElementById('search-box');
	const submitButton = document.getElementById('submit-button');

	// Other details that will be updated with javascript
	const IP_details = document.getElementById('IP-details');
	const location_details = document.getElementById('location-details');
	const timezone_details = document.getElementById('timezone-details');
	const ISP_details = document.getElementById('ISP-details');


	// On form submission
	submitButton.addEventListener("click", (event)=> {
		event.preventDefault();
		let searchValue = searchBox.value;
		let url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${searchValue}`;
	
		if (searchValue === "") {
			let warning = document.getElementById('warning');
			// warning.className = "text-warning";
			// warning.classList.toggle('text-warning');
			warning.textContent = `WARNING: `;
			// console.log(searchValue);
		} else {
			fetch(url)
		}
		// console.log(searchValue)
	});
});
