function initMap() {

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 24.5854, lng: 73.7125},
        zoom: 10
    });

    // bounds for map
    var bounds = new google.maps.LatLngBounds();

    // Initalizing info window as large info window
    var largeInfoWindow = new google.maps.InfoWindow();

    // Markers list array
    var markerList = [
        {
            title: 'Celebration mall',
            location: {lat: 24.6125, lng: 73.7027},
            index: 0
        },
        {
            title: 'Lakecity Mall',
            location: {lat: 24.5860, lng: 73.7105},
            index: 1
        },
        {
            title: 'Natraj Hotel',
            location: {lat: 24.5806, lng: 73.6963},
            index: 2
        },
        {
            title: 'Sukhadia Circle',
            location: {lat: 24.6013, lng: 73.6913},
            index: 3
        },
        {
            title: 'Fateh Sagar Lake',
            location: {lat: 24.6014, lng: 73.6742},
            index: 4
        },
        {
            title: 'Lake Palace',
            location: {lat: 24.5754, lng: 73.6800},
            index: 5
        },
        {
            title: 'Ambamata', location: {lat: 24.5857, lng: 73.6757}, index: 6
        },
        {
            title: 'City Palace',
            location: {lat: 24.5764, lng: 73.6835},
            index: 7
        },
        {
            title: 'Saheliyon-ki-Bari',
            location: {lat: 24.6031, lng: 73.6860},
            index: 8
        },
        {
            title: 'Bharatiya Lok Kala Mandal',
            location: {lat: 24.5945, lng: 73.6917},
            index: 9
        }];

    // markers array
    var markers = [];

    // initialises markers from markersList
    function initializeMarkers() {
        // creating markers
        for (var i = 0; i < markerList.length; i++) {
            var marker = new google.maps.Marker({
                position: markerList[i].location,
                map: map,
                title: markerList[i].title,
                animation: google.maps.Animation.DROP,
                id: i
            });

            markers.push(marker);

            bounds.extend(marker.position);

            // adding info window to marker
            marker.addListener('click', addMarkers);
        }
        // fit the bounds
        map.fitBounds(bounds);
    }

    function addMarkers() {
        populateInfoWindow(this, largeInfoWindow);

    }

    //refresh Marker
    function refreshMarkers(markerList) {
        // hides all markers in markers array

        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markerList().forEach(function (data) {
            markers[data.index].setMap(map);
        });
    }

    //Show details about single marker
    function showParticular(markerIndex) {
        // calls infowindow function
        populateInfoWindow(markers[markerIndex], largeInfoWindow);
        bounds.extend(markers[markerIndex].position);
        map.fitBounds(bounds);
    }


    // Info widow function
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;

            addLocationInfo(marker, infowindow);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
            });

            // Animates on opening infowindow
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                // stops animation after some time
                setTimeout(function () {
                    marker.setAnimation(null);
                }, 750);
            }
        }
    }

    // Adds location info from 'foursquare api' to infowindow
    function addLocationInfo(marker, infowindow) {
        // console.log(marker);
        var req_url = 'https://api.foursquare.com/v2/venues/search?v=20161016';
        var client_id = 'OGYOWYGXK3YPMIKBQUEVDAUYSHNN5KB21A1RGAUJ34OCMJTS';
        var client_secret = '1Z0FQG3LD4FZUW5CB5JJMBXSFKH25ZUADRK4IR4NHUJYCXPF';
        var ll = marker.getPosition().lat() + ',' + marker.getPosition().lng();
        var query = marker.title;

        req_url += '&client_id=' + client_id + '&client_secret=' + client_secret + '&ll=' + ll + '&query=' + query;

        // Makes ajax request to load data from third party api
        $.getJSON(req_url, function (data) {
            console.log(data);

            var found_place = data.response.venues[0];
            var marker_to_html = '<h3>' + marker.title + '</h3>' + '<hr>';

            if (found_place.categories.length) {
                marker_to_html += '<b>Place-type: </b>' + found_place.categories[0].name + '<br>';
            }

            marker_to_html += '<b>Address: </b>';
            if (found_place.location.address !== undefined) {
                marker_to_html += found_place.location.address + '<br>';
            }

            marker_to_html += found_place.location.city + ',' + found_place.location.country;

            infowindow.setContent(marker_to_html);

        })
            .fail(function () {//Called when request fails
                infowindow.setContent("Error Loading Details");
            });

    }

    // View Model
    function ViewModel() {
        var self = this;

        // creates marker filter value
        self.listFilter = ko.observable('');

        // initialises marker list
        self.markerList = markerList;

        //filters marker based on supplied filter value
        self.markers = ko.computed(function () {
            var filter = self.listFilter();
            if (filter === '') {
                return self.markerList;
            } else {
                var temp_list = self.markerList.slice();
                return temp_list.filter(function (marker) {
                    return marker.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
                });
            }
        });

        // refreshes markers based on filter value
        self.refreshMarkers = function () {
            refreshMarkers(self.markers);
        };

        // calls when an item is clicked from list
        self.itemClicked = function (markerIndex) {
            showParticular(markerIndex);
        };
    }

    // Initialises the function on document load
    $(document).ready(function () {
        // initialises markers
        initializeMarkers();

        // Knockoutjs initialisation
        var viewModel = new ViewModel();
        ko.applyBindings(viewModel);

    });
}
