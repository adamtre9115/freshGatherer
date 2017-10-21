// displays map on modal
var newAddress;

$("#mapBtn").on("click", function () {
    event.preventDefault();
    newAddress = $("#inputAddress").val();
    console.log(newAddress);
    $("#inputAddress").val("");
    $("#firstName").val("");
    $("#lastName").val("");
    $("#showMap").removeClass("hide");
    initMap();
})
// end click

function initMap() {
    var bounds = new google.maps.LatLngBounds;
    var markersArray = [];

    var origin1 = {
        lat: 35.228411,
        lng: -80.8373252
    };
    var destinationA = newAddress;

    var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 35.228411,
            lng: -80.8373252
        },
        zoom: 10
    });
    var geocoder = new google.maps.Geocoder;

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        console.log(response);
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function (asDestination) {
                var icon = asDestination ? destinationIcon : originIcon;
                return function (results, status) {
                    if (status === 'OK') {
                        map.fitBounds(bounds.extend(results[0].geometry.location));
                        markersArray.push(new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            icon: icon
                        }));
                    } else {
                        alert('Geocode was not successful due to: ' + status);
                    }
                };
            };
            

            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                geocoder.geocode({
                        'address': originList[i]
                    },
                    showGeocodedAddressOnMap(false));
                for (var j = 0; j < results.length; j++) {
                    geocoder.geocode({
                            'address': destinationList[j]
                        },
                        showGeocodedAddressOnMap(true));
                    // outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    //     ': ' + results[j].distance.text + ' in ' +
                    //     results[j].duration.text + '<br>';
                }
            }

            // get mileage between origin and destination
            var miles = parseInt(response.rows[0].elements[0].distance.text);
            console.log(miles);

            // display it to the page
            if (miles <= 10) {
                $("#output").html("Great news! You can expect your delivery today if you place your order before 12PM. If not, it can arrive tomorrow! Stay Fresh with a smoothie.");
            }else if (miles > 10 && miles <= 25) {
                $("#output").html("Ready to place your order? You can expect your delivery within 1-2 business days. Stay Fresh with a smoothie.");
            }else {
                $("#output").html("Ready to place your order? You can expect your delivery within 3-5 business days Stay Fresh with a smoothie.");
            }
        }
    });
}

function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}