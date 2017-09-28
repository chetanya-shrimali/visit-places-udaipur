//Main function called on calling google api url
var MapMain = function () {// acts as a controller or ModelViewViewModel

    // added styles to the map
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

    // places to be shown on the map
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

    // place markers containing array
    var place_markers = [];

    // info window to show details of specific marker
    var largeInfowindow = new google.maps.InfoWindow();

    // setting bounds to map
    var bounds = new google.maps.LatLngBounds();

    //initializing map
    var map = new google.maps.Map(document.getElementById('map'),
        {
            //location of udaipur
            center: {lat: 24.571270, lng: 73.691544},
            zoom: 13,
            styles: styles.styles
        });

    //loop to initialize the markers for specific places
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
    // setting map to fit to bounds
    map.fitBounds(bounds);

    //adding details to info window
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

    // getting location details from foursquare api
    function getLocationDetails(marker, infowindow) {
        // url for foursquare is of type
        //https://api.foursquare.com/v2/venues/search?v=20161016&client_id=OGYOWYGXK3YPMIKBQUEVDAUYSHNN5KB21A1RGAUJ34OCMJTS&
        // client_secret=1Z0FQG3LD4FZUW5CB5JJMBXSFKH25ZUADRK4IR4NHUJYCXPF
        // &ll=24.586, 73.71050000000002&query=Lakecity Mall
        // so to add certain values break the code
        var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?v=20161016';
        fourSquareUrl += '&client_id=' + 'OGYOWYGXK3YPMIKBQUEVDAUYSHNN5KB21A1RGAUJ34OCMJTS';
        fourSquareUrl += '&client_secret=' + '1Z0FQG3LD4FZUW5CB5JJMBXSFKH25ZUADRK4IR4NHUJYCXPF';
        fourSquareUrl += '&ll=' + marker.getPosition().lat() + ", " + marker.getPosition().lng();
        fourSquareUrl += '&query=' + marker.title;
        console.log(fourSquareUrl);
        // json request sent to the url getting the data in recieved
        $.getJSON(fourSquareUrl, function (recieved) {
            console.log(recieved);

            var response = recieved['response'];
            // checks for response if null
            if (response != null) {
                //iteration through json content
                //venues -> name
                //venues -> location -> address
                //venues -> contact -> phone
                //venues -> contact -> facebook

                var venues = recieved['response']['venues'];
                // checks for venues if null
                if (venues != null) {
                    //sets info window to null
                    infowindow.setContent("");

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
                    var title = "<h3>" + name + "</h3>";
                    title += "<strong>Address: </strong>" + address + "<br>";
                    title += "<strong>Contact: </strong>" + contact + "<br>";

                    console.log(title);
                    infowindow.setContent(title);
                } else {
                    console.log("No venues found");
                }
            } else {
                console.log("No respose");
            }
            // on function fail
        }).fail(function () {
            infowindow.setContent("oops!! Details could not be loaded");
        })
    }

    // function to hide the markers
    var hideMarkers = function (list_to_return) {
        var showThese = [];
        // iterates over list to return and checks for matched markers
        // and set them to visible
        for (var iterate in list_to_return) {
            for (var j in place_markers) {
                console.log("*");
                if (list_to_return[iterate] === place_markers[j]) {
                    showThese.push(j);
                }
                place_markers[j].setVisible(false);
            }
        }
        // sets the required items visible
        for (var i in showThese) {
            //console.log(showThese);
            console.log(place_markers[showThese[i]]);
            place_markers[showThese[i]].setVisible(true);
        }
    };

    // method does following things
    //1) checks and stores users input
    //2) returns list to be shown based on following input
    //3) hides markers based on input
    //4) popup info window based on the list item clicked
    function Octopus() {
        self = this;

        console.log('reached here');

        //storing text input from inputfield
        self.textInput = ko.observable('');

        console.log(place_markers);

        // function to return the list based on input text
        self.markers_list = ko.computed(function () {
            // list to be returned
            var list_to_return = [];

            // checking for text input
            console.log("View Model => " + self.textInput());
            var text_input_lowercase = self.textInput().toLowerCase();

            for (i in place_markers) {
                var place_markers_title = place_markers[i].title.toLowerCase();
                //console.log(place_markers_title);
                var substring_place_marker = place_markers_title.substring(0, text_input_lowercase.length);
                //console.log(substring_place_marker);
                if (substring_place_marker === text_input_lowercase) {
                    console.log("true");
                    list_to_return.push(place_markers[i]);
                }
            }
            // function call to hide markers
            hideMarkers(list_to_return);
            console.log(list_to_return);

            return list_to_return;
        });

        //takes the whole marker's data as input
        self.itemClicked = function (data) {
            console.log("reached");
            console.log(data);
            populateInfoWindow(data, largeInfowindow);
        };
    }

    var octopus = new Octopus();
    //applying bindings
    ko.applyBindings(octopus);
};
