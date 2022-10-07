// getting places from APIs
function loadPlaces(position) {
    return fetch('./Waypoints.geojson')
        .then((res) => {
            return res['feature'].json();
        });
    console.log(parsedWaypoints);
    var features = parsedWaypoints['features'];
    console.log("places loaded");

};


window.onload = () => {
    console.log("page loaded");
    
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords);
        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((features) => {
                features.forEach((wp) => {
                    const latitude = wp['geometry']['coordinates'][0];
                    const longitude = wp['geometry']['coordinates'][0];
                    console.log(latitude);
                    // add place name
                    const placeText = document.createElement('a-link');
                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title', place.name);
                    placeText.setAttribute('scale', '15 15 15');
                    
                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(placeText);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
