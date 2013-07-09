$(function() {
    var socket = io.connect('/');
    socket.on('connect', function() {
        console.log('--- socket.on connect');
    });

    //var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
    var mapOptions = {
        zoom: 4,
        panControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var contentString = "Who could live in this shit place...";

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Dumpster'
            });

            map.setCenter(pos);

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        }, function() {
            handleNoGeolocation(true);
        });
    }
    else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
});