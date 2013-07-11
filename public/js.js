$(function() {
    var socket = io.connect('/');
    socket.on('connect', function() {
        console.log('--- socket.on connect');
        socket.on('newNearPoints', function(nearPoints) {
            console.log(nearPoints);
            if (nearPoints.length > 0) {
                $.each(nearPoints, function(i) {
                    var infowindow = new google.maps.InfoWindow({
                        content: "name: " + nearPoints[i].name
                    });
                    var marker = addMarker(new google.maps.LatLng(nearPoints[i].geo[1], nearPoints[i].geo[0]))
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });
                });
            }
        });

        var mapOptions = {
            zoom: 15,
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var markers = [];

        var contentString = "You are here.";

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        var geocoder = new google.maps.Geocoder();
        var userPos;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                userPos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
                //userPos = new google.maps.latlng(-34.595808,-58.485160);

                var locInfo = new google.maps.InfoWindow({
                    content: contentString
                });

                var locMarker = new google.maps.Marker({
                    position: userPos,
                    map: map,
                    title: 'Your Location',
                    animation: google.maps.Animation.BOUNCE
                });
                var latlon = userPos.toUrlValue().split(',');
                findNear(latlon[0], latlon[1]);

                map.setCenter(userPos);

                google.maps.event.addListener(locMarker, 'click', function() {
                    infowindow.open(map, marker);
                });
                var update_timeout;
                google.maps.event.addListener(map, 'click', function(event) {
                    update_timeout = setTimeout(function() {
                        clearMarkers();
                        locMarker.setPosition(event.latLng);
                        //var latlon = event.latLng.toUrlValue().split(',');
                        //findNear(latlon[0], latlon[1]);
                        socket.emit('pointChanged', event.latLng.toUrlValue());
                    }, 400);
                });
                google.maps.event.addListener(map, 'dblclick', function(event) {
                    clearTimeout(update_timeout);
                });
            }, function() {
                handleNoGeolocation(true);
            });
        }
        else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }

        $("#geocode-submit").click(function(event) {
            var geoloc = $('#geocode-location').val();
            console.log(geoloc);
            geocoder.geocode({
                'address': geoloc
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });

        function clearMarkers() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        function addMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);
            return marker;
        }

        function findNear(lat, lon) {
            $.getJSON('/findNear?lat=' + lat + '&lon=' + lon, function(data) {
                console.log(data.length)
                if (data.length > 0) {
                    $.each(data, function(i) {
                        var infowindow = new google.maps.InfoWindow({
                            content: "name: " + data[i].name
                        });
                        var marker = addMarker(new google.maps.LatLng(data[i].geo[1], data[i].geo[0]))
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });
                    });
                }
            });
        }
    });
});