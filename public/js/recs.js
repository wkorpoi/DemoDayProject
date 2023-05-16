var map;
var service;
var infowindow;

const ul = document.getElementById("list");

function showRecs() {
  const address = document.querySelector("#location").innerText;
  // using google map's geocoding api to grab the lat and long of the provided city in order to use in the google places api
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      const coordinates = results[0].geometry.location;
      console.log({ coordinates });
      var pyrmont = new google.maps.LatLng(coordinates);

      map = new google.maps.Map(document.getElementById("map"), {
        center: pyrmont,
        zoom: 15,
      });

      var request = {
        location: pyrmont,
        radius: "500",
        type: ["restaurant"],
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    } else {
      console.log("cant get lat and long :(", status);
    }
  });
  // 39.9526° N, 75.1652
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      if (i > 20) return;
      let newul = document.createElement("ul");
      const li = document.createElement("li");
      const li2 = document.createElement("li");
      const li3 = document.createElement("li");
      const li4 = document.createElement("li");
      const li5 = document.createElement("li");
      const img = document.createElement("img");
      img.src = results[i].photos[0].getUrl();
      li.innerText = `place: ${results[i].name}`;
      li2.innerText = `rating: ${results[i].rating}`;
      li4.innerText = `price: ${results[i].price_level}`;
      li3.appendChild(img);
      li5.innerText = `place: ${results[i].vicinity}`;
      newul.appendChild(li);
      newul.appendChild(li2);
      newul.appendChild(li3);
      newul.appendChild(li4);
      newul.appendChild(li5);
      newul.classList.add("rec");
      ul.appendChild(newul);
      console.log(results[i]);
    }
  }
}

addEventListener("load", showRecs);
