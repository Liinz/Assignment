var mapboxTiles = L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18,});
//  var mapboxTiles = L.tileLayer.grayscale
var map = L.map('map')
   .addLayer(mapboxTiles)
   .setView([31.2228143, 121.474048], 11);

 layerGroup = L.layerGroup().addTo(map);

 var items = [];
 var airtable_read_endpoint = "https://api.airtable.com/v0/appEpSTexILVjl4AS/Galleries?api_key=keyoqDJjf0JgN8eFB";
 var data = [];
 $.getJSON(airtable_read_endpoint, function(result) {
       $.each(result.records, function(key,value) {
           items = {};
               items["name"] = value.fields.Name;
               items["url"] = value.fields.url;
               items["image_url"] = value.fields.img_url;
               items["latitud"] = value.fields.Lat;
               items["longitud"] = value.fields.Lng;
               data.push(items);
               console.log(items);
        }); // end .each
}); // end getJSON

function remove_map() {
    $('#map').hide();
    map.remove(); 
    // location.reload();
}

function clear_map() {
    $('#map').show();
    layerGroup.clearLayers();
    var mapboxTiles = L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18,});

    var map = L.map('map')
      .addLayer(mapboxTiles)
      .setView([31.2228143, 121.474048], 11);

    layerGroup = L.layerGroup().addTo(map);

    var items = [];
    var airtable_read_endpoint = "https://api.airtable.com/v0/appEpSTexILVjl4AS/Galleries?api_key=keyoqDJjf0JgN8eFB";
    var data = [];
    $.getJSON(airtable_read_endpoint, function(result) {
          $.each(result.records, function(key,value) {
              items = {};
                  items["name"] = value.fields.Name;
                  items["url"] = value.fields.url;
                  items["image_url"] = value.fields.img_url;
                  items["latitud"] = value.fields.Lat;
                  items["longitud"] = value.fields.Lng;
                  data.push(items);
                  console.log(items);
            }); // end .each
    }); // end getJSON
}

function place_marker() {
    // var place = document.getElementById("filter").value;
    place = parseInt(filter.value);
    var latlng = L.latLng({ lat: data[place].latitud, lng: data[place].longitud });
    L.marker( latlng )
      .bindPopup( '<a href="' + data[place].url + '" target="_blank">' + '<img src="' + data[place].image_url+'" width = "80px"><br>'+data[place].name + '</a>' )    
      .addTo(layerGroup);
    /* 
    var marker =  L.marker( data[place].lat, data[place].lng)
        .bindPopup( '<a href="' + data[place].url + '" target="_blank">' + data[place].name + '</a>' )         
        .addTo(map);
    */
}   


function show_districts(){
  for (var i in data) {
      var latlng = L.latLng({ lat: data[i].latitud, lng: data[i].longitud });
      L.marker( latlng )
          .bindPopup( '<a href="' + data[i].url + '" target="_blank">' + '<img src="' + data[i].image_url+'" width = "80px"><br>'+data[i].name + '</a>' )
          .addTo(layerGroup);
  }
}

function clear_markers () {
               // map.removeLayer(marker);
               layerGroup.clearLayers();
}

