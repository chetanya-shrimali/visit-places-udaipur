//var styles = require("./styles.js");
var init = function () {

    var styles = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#523735"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9b2a6"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dcd2be"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ae9e90"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#93817c"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a5b076"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#447530"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fdfcf8"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f8c967"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e9bc62"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e98d58"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#db8555"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#806b63"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8f7d77"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b9d3c2"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#92998d"
                }
            ]
        }
    ];
    var to_visit = [
        {
            title: 'Celebration mall',
            location: {lat: 24.6125, lng: 73.7027},
        },
        {
            title: 'Lakecity Mall',
            location: {lat: 24.5860, lng: 73.7105},
        },
        {
            title: 'Natraj Hotel',
            location: {lat: 24.5806, lng: 73.6963},
        },
        {
            title: 'Sukhadia Circle',
            location: {lat: 24.6013, lng: 73.6913},
        },
        {
            title: 'Fateh Sagar Lake',
            location: {lat: 24.6014, lng: 73.6742},
        },
        {
            title: 'Lake Palace',
            location: {lat: 24.5754, lng: 73.6800},
        },
        {
            title: 'Ambamata',
            location: {lat: 24.5857, lng: 73.6757}
        },
        {
            title: 'City Palace',
            location: {lat: 24.5764, lng: 73.6835},
        },
        {
            title: 'Saheliyon-ki-Bari',
            location: {lat: 24.6031, lng: 73.6860},
        },
        {
            title: 'Bharatiya Lok Kala Mandal',
            location: {lat: 24.5945, lng: 73.6917},
        }];

    var map = new google.maps.Map(document.getElementById('map'), {
        //location of udaipur
        center: {lat: 24.571270, lng: 73.691544},
        zoom: 13,
        styles: styles.styles
    });

    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();
    var place_markers = [];

    for (var i = 0; i < to_visit.length; i++) {

        var position = to_visit[i].location;
        var title = to_visit[i].title;
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map,
            animation: google.maps.Animation.DROP,
            id: i
        });
        place_markers.push(marker);
        bounds.extend(place_markers[i].position);
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
        });

    }

    console.log(place_markers);
    map.fitBounds(bounds);
};

function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
            infowindow.setMarker = null;
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
        // stops animation after some time
        setTimeout(function () {
            marker.setAnimation(null);
        }, 650);
        getLocationDetails(marker, infowindow);
    }
}

function getLocationDetails(marker, infowindow) {
    var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?v=20161016';
    var client_id = 'OGYOWYGXK3YPMIKBQUEVDAUYSHNN5KB21A1RGAUJ34OCMJTS';
    var client_secret = '1Z0FQG3LD4FZUW5CB5JJMBXSFKH25ZUADRK4IR4NHUJYCXPF';
    var latlong = marker.getPosition().lat() + ", " + marker.getPosition().lng();
    var title = marker.title;

    fourSquareUrl += '&client_id=' + client_id;
    fourSquareUrl += '&client_secret=' + client_secret;
    fourSquareUrl += '&ll=' + latlong;
    fourSquareUrl += '&query=' + title;
    console.log(fourSquareUrl);

    $.getJSON(fourSquareUrl, function (recieved) {
        console.log(recieved);
        var response = recieved['response'];
        if (response != null) {
            var venues = recieved['response']['venues'];
            if(venues !=null) {
                var first_venue = venues[0];

                console.log(venues);
                console.log(first_venue);

                var name = first_venue['name'] || 'not found';
                var formatted_address = first_venue['location']['formattedAddress'];
                var address = "";
                if (formatted_address != null) {
                    for (i in formatted_address) {
                        address += formatted_address[i] + ", ";
                    }
                } else {
                    address = "not found";
                }
                var contact = (first_venue['contact']['formattedPhone'] || "not found") + " " + (first_venue['contact']['facebook'] || "not found");
                var title = "<h1>" + name + "</h1>";
                title += "<strong>Address: </strong>" + address + "<br>";
                title += "<strong>Contact: </strong>" + contact + "<br>";

                console.log(title);
            }else {
                console.log("No venues found");
            }
        }else {
            console.log("No respose");
        }
    }).fail(function () {
        infowindow.setContent("oops!! Details could not be loaded");
    })
}

function Octopus() {
    var self = this;

}

function onError() {
    console.log("Error");
}
