var Insubria = [45.88396420045334, 8.718830747234604];

var mymap = L.map('mapid').setView(Insubria, 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
    minZoom: 16,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

var userIcon = L.icon({
    iconUrl: "assets/images/user-icon-2d.png",
    iconSize: [25,41],
});
var myIcon = L.icon({
	iconUrl: "assets/images/marker-icon-2d.png",
	iconSize: [25,41],
});

mymap.locate() 
	.on('locationfound', function(e){
		var user = L.marker([e.latitude, e.longitude], {icon: userIcon}).addTo(mymap);
		user.bindPopup('You are here');

	})
	.on('locationerror', function(e){
		console.log(e);
		alert("Location access denied.");
	});

let httpReq = new XMLHttpRequest();
httpReq.open("GET", "assets/places.json");
httpReq.send(null);
httpReq.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let json = httpReq.response;
		let places = JSON.parse(json);
		//let places = obj.Campus;
		for(let i = 0; i < places.length; i++){
			var marker = L.marker([places[i].latitude, places[i].longitude], {icon: myIcon}).addTo(mymap);
			marker.bindPopup(places[i].desc);
		}
	}	
}
