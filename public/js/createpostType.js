// alert("createpostType.js");
function storageAvailable(type) {
      try {
            var storage = window[type],
                  x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
      }
      catch (e) {
            return e instanceof DOMException && (
                  // everything except Firefox
                  e.code === 22 ||
                  // Firefox
                  e.code === 1014 ||
                  // test name field too, because code might not be present
                  // everything except Firefox
                  e.name === 'QuotaExceededError' ||
                  // Firefox
                  e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                  // acknowledge QuotaExceededError only if there's something already stored
                  storage.length !== 0;
      }
}
if (storageAvailable('localStorage')) {
      // Yippee! We can use localStorage awesomeness
      // var location = localStorage.getItem("locationVal");
      if(localStorage.getItem("locationVal")){
            var locationVal = localStorage.getItem("locationVal").replace("\"", "").replace("\"", "");
            $("#locationHeader").prepend(locationVal);
            // $("#cityInput").attr("value", locationVal);
            $("#locationHeader").attr("value", locationVal);
      }
      if(localStorage.getItem("locationVal")&&localStorage.getItem("radiocategoryValue")){
            radioTypeValue = localStorage.getItem("radioTypeValue").replace("\"", "").replace("\"", "");
            radiocategoryValue = localStorage.getItem("radiocategoryValue").replace("\"", "").replace("\"", "");
            $("#typeHeader").prepend(radioTypeValue);
            $("#typeHeader").attr("value", radioTypeValue);
            $("#categoryHeader").prepend(radiocategoryValue);
            $("#categoryHeader").attr("value", radiocategoryValue);
      }
      // var locationVal = localStorage.getItem("locationVal").replace("\"", "").replace("\"", "");
      // var radioTypeValue = localStorage.getItem("radioTypeValue").replace("\"", "").replace("\"", "");
      // var radiocategoryValue = localStorage.getItem("radiocategoryValue").replace("\"", "").replace("\"", "");
      
      var originPlc=localStorage.getItem("originPlc").replace("\"", "").replace("\"", "");
      // alert("originPlc: "+typeof originPlc);
      var destinationPlc=localStorage.getItem("destinationPlc").replace("\"", "").replace("\"", "");
      var lat=localStorage.getItem("lat").replace("\"", "").replace("\"", "");
      var lng=localStorage.getItem("lng").replace("\"", "").replace("\"", "");
      // alert("radioVal**get::---locationVal:" + locationVal+" +radioTypeValue:"+radioTypeValue+" radiocategoryValue:"+radiocategoryValue);
      
      // $("#locationHeader").attr("value",locationVal);
      
      
      $("#stateInput").attr("value", "WA");

      $("#originPlc").attr("value", originPlc);
      $("#destinationPlc").attr("value", destinationPlc);
      $("#lat").attr("value", lat);
      $("#lng").attr("value", lng);
      $("#originPlc").text(originPlc);
      $("#destinationPlc").text(destinationPlc);
      $("#lat").text(lat);
      $("#lng").text(lng);


      // $("#locationHeader").html(locationVal+" >");
      // //handle createpostInfo page
      // if(localStorage.getItem("postObj")){
      //       alert("localstoragy::postObj");
      //       alert(localStorage.getItem("postObj"));
      // };
}
else {
      // Too bad, no localStorage for us
      alert("you can't use localStorage");
}
