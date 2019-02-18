// var postInfoArray = [];
var post = {};
var postInfoObj = {};
var mapMarkers = [];
var mapPostIemMarkers=[]
// var mapMarkersIncludingLoc = [];
var startMapMarkers = [];
var map;
var iconI = 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';
var iconGreen = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';//pink-dot.png/yellow-dot.png/purple-dot.png
var originPlace = "";
var latDir, lngDir;
// module.exports = function () {
var API = {
      getPosts: function () {
            return $.ajax({
                  url: "/api/allPosts",
                  type: "get"
            });
      },
      savePostInfo: function (post) {
            return $.ajax({
                  headers: {
                        "Content-Type": "application/json"
                  },
                  type: "post",
                  url: "/api/createpostInfo",
                  data: JSON.stringify(post)
            }).then(function (dbPost) {
                  // if (err) throw err;
                  alert("---post--/api/createpostInfo-----" + dbPost);
            });
      },
      //postItem page
      getPostsByUsername: function (username) {
            return $.ajax({
                  url: "/api/createpostInfo/username/" + username,
                  type: "get"
            });
      },
      // Search By Zipcode page
      getPostsByZipcode: function (zipcode) {
            return $.ajax({
                  url: "/api/createpostInfo/zipcode/" + zipcode,
                  type: "get"
            });
      },
      //Search By title page
      getPostsByUseditem: function (title) {
            return $.ajax({
                  url: "/api/createpostInfo/title/" + title,
                  type: "get"
            });
      },
      // Delete a post by id
      deleteById: function (id) {
            return $.ajax({
                  url: "/api/createpostInfo/" + id,
                  type: "DELETE"
            });
      },
      getPostById: function (id) {
            return $.ajax({
                  url: "/api/getPost/" + id,
                  type: "get"
            });
      },
      saveMap: function (addressArray) {
            return $.ajax({
                  headers: {
                        "Content-Type": "application/json"
                  },
                  type: "post",
                  url: "/api/createMap",
                  data: JSON.stringify(addressArray)
            });
      },
      uploadImage: function () {
            return $.ajax({
                  type: "post",
                  url: "/api/upload"
                  // enctype: "multipart/form-data"
                  // data: JSON.stringify(file)
            }).then(function (data) {
                  alert("img/load--" + JSON.stringify(data));
                  console.log("img/load--" + JSON.stringify(data));
            });
      }
}
var refreshLocation = function () {
      API.getLocation().then(function (data) {
            alert.log("**888****", data);
            // $("#testId").text(data);
      });
};
var handleLocationFormSubmit = function (event) {
      event.preventDefault();
      // var location = {};
      var radioValue = $("input[name='locationNam']:checked").val();
      if (radioValue) {
            // alert("Your are a - " + radioValue);
            // location.location = radioValue;
            // localStorage.location = JSON.stringify(location);
            var locationVal = JSON.stringify(radioValue);
            // alert("locationVal:: " + locationVal);

            localStorage.setItem("locationVal", locationVal);
      } else {
            // alert("You must choice a location!");
            return;
      }

      // API.saveLocation(location).then(function () {
      //       // refreshLocation();
      //       console.log("----saveLocation--------");
      // });
      //Load createpostType page
      window.location.href = "/createpostType";
      // alert("window.location.href");

      // window.location.href = "/createpostType/?data" + location;
};
var handleTypeFormSubmit = function (event) {
      event.preventDefault();
      var radioTypeValue = $("input[name='typeNam']:checked").val();
      var radiocategoryValue = $("input[name='categoryNam']:checked").val();
      if (radioTypeValue) {
            // alert("Your are a - " + radioTypeValue+" + "+radiocategoryValue);
            // localStorage.location = JSON.stringify(location);
            var radioTypeVal = JSON.stringify(radioTypeValue);
            var radiocategoryVal = JSON.stringify(radiocategoryValue);
            localStorage.setItem("radioTypeValue", radioTypeVal);
            localStorage.setItem("radiocategoryValue", radiocategoryVal);
      } else {
            // alert("You must choice a location!");
            return;
      }
      //Load createpostType page
      window.location.href = "/createpostInfo";
};
var handlePostInfoFormSubmit = function (event) {

      event.preventDefault();
      // alert("handlePostInfoFormSubmit");
      /**------upload image------ */
      // var file=$(".postImg").val();
      // API.uploadImage();
      // API.uploadImage().then(function(data){
      //       console.log(data);
      //       alert("image: "+JSON.stringify(data));

      // })
      /**------------get input value----- */
      var cityArea = $("#locationHeader").attr("value");
      // alert("cityArea: "+cityArea);
      var typeOfPost = $("#typeHeader").attr("value");
      var category = $("#categoryHeader").attr("value");
      var title = $("#postTitle").val().trim();
      // alert("title: "+title);
      var price = $("#postPrice").val().trim();
      var condition = $("option[name='conditionOpt']:selected").val();
      // var img = $(".postImg").val();
      // var img=
      // alert("img: "+img);
      var userName = $(".username").text();
      // alert("userName: " + userName); if null 
      var contactNam = $("#contactNam").val().trim();
      var email = $("#email").val().trim();
      var phoneNum = $("#phoneNum").val().trim();
      var contactMedium = $("#contactMedium").val().trim();
      var language = $("option[name='laguageNam']:selected").val();
      var street = $("#street").val().trim();
      var location = $("#cityInput").val().trim();//city
      var state = $("#stateInput").val().trim();
      var zipcode = $("#zipcode").val().trim();
      // alert("condition: "+condition);


      var post = {
            title: title,
            street: street,
            city: location,
            state: state,
            postCode: zipcode,
            typeOfPost: typeOfPost,
            category: category,
            price: price,
            condition: condition,
            languageOfPost: language,
            email: email,
            phoneNum: phoneNum,
            contactName: contactNam,
            contactMedium: contactMedium,
            // image: img,
            userName: userName,
            cityArea: cityArea
      };
      // alert("post: " + JSON.stringify(post));
      if (!(post.title && post.street && post.city && post.state && post.postCode && post.phoneNum)) {
            alert("You must enter an necessory!");
            return;
      }
      try {
            localStorage.setItem("postObj", JSON.stringify(post));
      } catch (error) {
            console.log(error);
      }

      // API.savePostInfo(post).then(function () {
      //       // refreshExamples();
      // });

      // window.location.href = "/index";
      window.location.href = "/upload";
      // alert("window.location.href = /index");
};
var handleSearch = function (event) {
      event.preventDefault();
      $("#alertRow").html("");//clear the alert info
      var postInfoArray = [];
      // alert("ok");
      var searchVal = $("option[name='searchNam']:selected").val();
      var searchInput = $("#searchInput").val().trim();
      // alert(searchVal);
      if (searchVal === 'title') {

            API.getPostsByUseditem(searchInput).then(function (dbPosts) {
                  
                  // alert("getPostsByUseditem" + JSON.stringify(dbPosts).length);//2
                  if(JSON.stringify(dbPosts).length==2){
                        // alert("No related Baby Used Item: "+searchInput);
                        var alertInfo=`No related Baby Used Item: ${searchInput}`;
                        $("#alertRow").html(alertInfo);
                        $("#allPosts").html("");
                        return;
                  }
                  if (!dbPosts) {//false
                        // alert("No related Baby Used Item");
                        // $("#allPosts").append(`<p id='alertId'>No related Baby Used Item: ${searchInput}</p>`);
                        return;
                  }
                 
                  //index page updated
                  postsByUsedItemShow(dbPosts);
                  // $("#allPostsCol").hide();??
                  mapMarkers.forEach(function (lastmarkers) {
                        lastmarkers.setMap(null);
                  });
                  // postInfoArray=dbPosts;
                  dbPosts.forEach(function (eachPost) {
                        // alert(JSON.stringify(eachPost));
                        postInfoArray.push(eachPost);
                  });
                  var geocoder = new google.maps.Geocoder();
                  searchMap(postInfoArray, geocoder);

            });
      } else if (searchVal === 'zipcode') {
            // $("#allpostContainer").hide()
            // $("#map").hide();
            API.getPostsByZipcode(searchInput).then(function (dbPosts) {
                  if(JSON.stringify(dbPosts).length==2){
                        // alert("No related Baby Used Item: "+searchInput);
                        var alertInfo=`No related Zipcode: ${searchInput}`;
                        $("#alertRow").html(alertInfo);
                        $("#allPosts").html("");
                        return;
                  }
                  if (!dbPosts) {
                        // alert("No related goods in this zipcode: " + searchInput);
                        $("#allPosts").append(`<p id='alertId'>No related Zipcode: ${searchInput}</p>`);
                        return;
                  }
                  postItemsByZipcodeShow(dbPosts);
            });
      }

}
var handleSubmit = function () {
      var post = JSON.parse(localStorage.getItem("postObj"));
      //      alert("post+++"+post);
      if ($("#uploadImg").attr("src")) {
            post.image = $("#uploadImg").attr("src");
            // alert("post.image::" + post.image);
      }
      API.savePostInfo(post);

      window.location.href = "/index";
      // alert("window.location.href =index");
}
var handleDeletePostItem = function () {
      var id = $(this).val();
      // alert("delete ok and id is "+id);
      API.deleteById(id);
      //refresh the postItem page
      location.reload();
}
$(document).on("click", ".locationBtn", handleLocationFormSubmit);
$(document).on("click", ".typeBtn", handleTypeFormSubmit);
$(document).on("click", ".postInfoBtn", handlePostInfoFormSubmit);
$(document).on("click", ".searchBtn", handleSearch);
$(document).on("click", "#submitBtn", handleSubmit);
$(document).on("click", "#deletePostItem", handleDeletePostItem);
// $(document).on("click", "#deletePostItem", handleDeletePostItem);
$(document).on("change", "#inputGroupSelect01",allPostsShow );

// var handleChangeSelect=function(){
//       //refresh index page
//       location.reload();
// allPostsShow();
// }
$(document).on("click", ".allPostBtn", locatedPostItem);//all list for each post click 
/**
 * * init Google map
*/
function initMap() {
      // alert("initMap");
      // get the location you stay
      function getLocation() {
            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                  alert("Geolocation is not supported by this browser.");
            }
      }
      function showPosition(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            latDir = position.coords.latitude;
            lngDir = position.coords.longitude;
            var originPos = new google.maps.LatLng(lat, lng);
            var geocoder = new google.maps.Geocoder();
            //get the corrent address
            geocoder.geocode({
                  'latLng': originPos
            }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                              // alert(results[0].formatted_address);
                              originPlace = results[0].formatted_address;
                        }
                  }
            });

            //      alert("Latitude: " + position.coords.latitude +
            //             "<br>Longitude: " + position.coords.longitude);
            // var pinColor = "#ffff99";
            // var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor);
            map = new google.maps.Map(document.getElementById('map'), {
                  center: { lat: lat, lng: lng },//lat: 47.619905, lng: -122.320868
                  zoom: 10,
                  mapTypeId: 'roadmap',
                  mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: google.maps.ControlPosition.BOTTOM_CENTER
                  },
                  scaleControl: true
                  // mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var marker = new google.maps.Marker({
                  position: { lat: position.coords.latitude, lng: position.coords.longitude },
                  map: map,
                  icon: iconGreen,
                  draggable: true,
                  title: "Confirm your location"
                  // animation: google.maps.Animation.DROP,
                  // title: "Confirm your location!"
            });
            var dragInfoWindow;
            // mapMarkersIncludingLoc.push(marker);
            //pass the event.latLng trough the Geocoder to get the address
            google.maps.event.addListener(marker, 'dragend', function (event) {
                  geocoder.geocode({
                        'latLng': event.latLng
                  }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                              if (results[0]) {
                                    originPlace = results[0].formatted_address;
                                    // alert(results[0].formatted_address);
                                    dragInfoWindow = new google.maps.InfoWindow({
                                          maxWidth: 180,
                                          content: `
                                        <div><strong>${results[0].formatted_address}</strong></div>
                                        `
                                    });
                                    marker.addListener('mouseover', function () {
                                          dragInfoWindow.open(map, marker);// how to close last infoWindow when drage again???====Just make sure you only create ONE infoWindow in the global scope
                                    });

                              }
                        }
                  });
            });
      }
      getLocation();

}
/**
 * Search By baby used items in google map
 */
function searchMap(postInfoArray, geocoder) {
      // var geocoder = new google.maps.Geocoder();
      // // alert("addressArray: "+JSON.stringify(addressArray));
      // //show the list in the map after search by used item
      // geocodeAddress(geocoder, map);
      // alert("addressArray: "+JSON.stringify(addressArray));
      postInfoArray.forEach(function (eachPostObj) {
            var address = eachPostObj.street + ", " + eachPostObj.city + ", " + eachPostObj.state + " " + eachPostObj.postCode
            geocoder.geocode({ 'address': address }, function (results, status) {
                  // alert("results: " + JSON.stringify(results[0].geometry.location) + " status: " + status);
                  postInfoObj = {
                        id: eachPostObj.id,
                        lanlg: results[0].geometry.location,
                        price: eachPostObj.price,
                        condition: eachPostObj.condition,
                        image: eachPostObj.image,
                        title: eachPostObj.title,
                        address: address,
                        phoneNum: eachPostObj.phoneNum
                  };
                  if (status === 'OK') {
                        // alert(JSON.stringify(postInfoObj));
                        addMarker(postInfoObj, map);
                        // resultsMap.setCenter(results[0].geometry.location);
                        // var marker = new google.maps.Marker({
                        //       map: resultsMap,
                        //       position: results[0].geometry.location,
                        //       draggable: true,
                        //       title: "Confirm your location!"
                        // });
                  } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                  }
            });
      });
}
function addMarker(postInfoObj, resultsMap) {
      // alert("postInfoObj.lanlg: "+postInfoObj.lanlg);
      resultsMap.setCenter(postInfoObj.lanlg);
      var marker = new google.maps.Marker({
            position: postInfoObj.lanlg,
            map: resultsMap
            // title: "Confirm your location!"
      });

      var infoWindow = new google.maps.InfoWindow({
            maxWidth: 280,
            // backgroundColor: 'rgb(165,42,42)',
            content: `
          <div><strong>${postInfoObj.title}</strong></div>
          <div>Price: ${postInfoObj.price}</div>
          <div>Address: ${postInfoObj.address}</div>
          <div>Phone Number: ${postInfoObj.phoneNum}</div>
          <img class="businessImg" src="${postInfoObj.image}">
          <button class="directionBtn" value="${postInfoObj.address}" id="${postInfoObj.id}">direction</button>
          `
      })

      marker.addListener('click', function () {
            infoWindow.open(resultsMap, marker);
      });

      mapMarkers.push(marker);
      // mapPostIemMarkers.push(marker);
      // mapMarkersIncludingLoc.push(marker);

}
//check the routs from origin to destination
$(document).on("click", ".directionBtn", function () {
      if ($(this).val()) {
            // alert("lat: "+latDir+" ==lng: "+lngDir);
            localStorage.setItem("originPlc", originPlace);
            localStorage.setItem("destinationPlc", $(this).val());
            localStorage.setItem("lat", latDir);
            localStorage.setItem("lng", lngDir);
            // window.location.href = "/directionMap";
            window.open("/directionMap");
      }

      // alert($(this).val());
      // var directionPlace = $(this).val();
      // alert("originPlace: "+originPlace+"----directionPlace: "+directionPlace);
      // // Instantiate a directions service.
      // var directionsService = new google.maps.DirectionsService();
      // // Create a renderer for directions and bind it to the map.
      // var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
      // var request = {
      //       travelMode: google.maps.TravelMode.DRIVING,
      //       origin: originPlace,
      //       destination: directionPlace
      // };
      // directionsService.route(request, function (response, status) {
      //       if (status === 'OK') {
      //             directionsDisplay.setDirections(response); Î
      //       }
      // });

});
// Removes all pushpins from the map
function removeMarkers() {
      // for moving maker on page load 
      for (let marker of startMapMarkers) {
            marker.setMap(null);
      }
      startMapMarkers = [];
}
/**
 * Load the information if the user has posted and login
 */
function choiceForUser() {
      // alert("ok");
      /**
       * check the user has posted information
       * if the user posted a lot item, then the page will fill the latest address and contact information
       */
      var username = $(".username").text();
      //not login
      if (!username) {
            return;
      }

      API.getPostsByUsername(username).then(function (dbposts) {
            // alert(JSON.stringify(dbposts));
            var n = dbposts.length;
            var selectedLocationVal = dbposts[n - 1].cityArea;
            var selectedTypeVal = dbposts[n - 1].typeOfPost;
            var selectedCategoryVal = dbposts[n - 1].category;
            var contactNam = dbposts[n - 1].contactName;
            var email = dbposts[n - 1].email;
            var phoneNum = dbposts[n - 1].phoneNum;
            var contactMedium = dbposts[n - 1].contactMedium;
            var street = dbposts[n - 1].street;
            var cityInput = dbposts[n - 1].city;
            var stateInput = dbposts[n - 1].state;
            var zipcode = dbposts[n - 1].postCode;

            //login: The sys will auto selected the location in createpost page
            $("input[name='locationNam']").each(function () {
                  //Eastside include the cities of Bellevue, Kirkland, Redmond, Sammamish, Issaquah, Newcastle, and Mercer Island
                  if ($(this).val() === selectedLocationVal) {
                        // alert(selectedVal);
                        $(this).prop("checked", true);;
                  }
            });
            // alert(JSON.stringify(dbposts[n-1]));
            //login: The sys will auto selected the tye and category in createpostType page
            $("input[name='typeNam']").each(function () {
                  if ($(this).val() === selectedTypeVal) {
                        // alert(selectedVal);
                        $(this).prop("checked", true);;
                  }
            });
            $("input[name='categoryNam']").each(function () {
                  if ($(this).val() === selectedCategoryVal) {
                        // alert(selectedVal);
                        $(this).prop("checked", true);;
                  }
            });
            //login: The sys will auto selected the contact Info and Location Info in createpostInfo page
            $("#contactNam").attr("value", contactNam);
            $("#email").attr("value", email);
            $("#phoneNum").attr("value", phoneNum);
            $("#contactMedium").attr("value", contactMedium);
            $("#street").attr("value", street);
            $("#cityInput").attr("value", cityInput);
            $("#stateInput").attr("value", stateInput);
            $("#zipcode").attr("value", zipcode);
      });


}
// window.onload = choiceForUser;
// window.onload = postItems;
window.onload = function () {
      if (window.location.href.match("createpost") != null||window.location.href.match("createpostType") != null||window.location.href.match("createpostInfo") != null) {
            // alert("createpostInfo");
            choiceForUser();//createpostInfo page
      } else if (window.location.href.match("postItem") != null) {
            // alert("postItem");
            postItems();//postItems page
      } else if (window.location.href.match("index") != null) {
            allPostsShow();
      }



}
// alert("window.location.href: " + window.location.href.match("index") != null);
// if (window.location.href.match('car-driving.html') != null) {
// }
function postItems() {
      var username = $(".username").text();
      //not login
      if (!username) {
            return;
      }
      //     alert(username);
      API.getPostsByUsername(username).then(function (postItemsdb) {
            // alert(JSON.stringify(postItemsdb));
            // var postItemStr = "<ol>";
            postItemsShow(postItemsdb);

      });
}
var postItemsShow = function (postItemsdb) {
      postItemsdb.forEach(function (postItem) {
            //--------------------------
            testStr='<div class="row"><div class="col-6"><ul>'
            testStr += `<li id="typeOfPostLi"><strong>${postItem.typeOfPost}</strong></li>`;
            testStr += `<li><strong>${postItem.title}</strong></li>`;
            testStr += `<li>$ <strong>${postItem.price}</strong></li>`;
            testStr += `<li>${postItem.condition}</li>`;
            // testStr += `<li>${postItem.category}</li>`;
            testStr += '<li id="typeLi">Adress:</li>';
            testStr += `<li>${postItem.street}</li>`;
            testStr += `<li>${postItem.city}</li>`;
            testStr += `<li>${postItem.state}</li>`;
            testStr += `<li>${postItem.postCode}</li>`;
            testStr += '<li id="typeLi">Contact Info:</li>';
            // alert(postItem.contactName=="");
            testStr += `<li>${(postItem.contactName == "") ? "<font color='grey'>name: ?</font>" : postItem.contactName}</li>`;
            testStr += `<li>${(postItem.phoneNum == "") ? "<font color='grey'>Phone: ?</font>" : postItem.phoneNum}</li>`;
            testStr += `<li>${(postItem.email == "") ? "<font color='grey'>Email: ?</font>" : postItem.email}</li>`;
            testStr += `<li>${(postItem.contactMedium == "") ? "<font color='grey'>Contact Medium: ?</font>" : postItem.contactMedium}</li>`;
            testStr += `<li>${(postItem.languageOfPost == ""||postItem.languageOfPost ==null) ? "<font color='grey'>Laguage: ?</font>" : postItem.languageOfPost}</li>`;
            testStr+='</ul></div><div class="col-6">'
            testStr+=`<img class="postItemImg" src=${postItem.image}>`;
            testStr+='</div></div>'
            var btnId = postItem.id;
            var bodyId = "body" + postItem.id;
            var dataTarget = "#body" + postItem.id;
            var content = '<div class="card"><div class="card-header"><button  class="btn btn-link" type="button" data-toggle="collapse" data-target="' + dataTarget + '"'
                  + ' aria-expanded="fase" aria-controls="' + bodyId + '"'
                  + '> <strong>title:</strong> ' + postItem.title + ' <strong>price:</strong> ' + postItem.price + ' <strong>condition:</strong> ' + postItem.condition + '<button id="deletePostItem" value=' + btnId + ' type="button" class="btn btn-danger">delete</button>' + ' </button></div> <div '
                  + 'id="' + bodyId + '"'
                  + ' class="collapse"> <div class="card-body">'
                  + testStr
                  + '</div></div></div>';
            // alert(content);
            $("#postItemsContainer").append(content);
      });
      // postItemStr += "</ol>"
      // $("#postItemContainer").append(postItemStr);
}
var postItemsByZipcodeShow = function (postItemsdb) {
      // $("#alertRow").hide();
      $("#allPosts").html("");
      postItemsdb.forEach(function (postItem) {
            //--------------------------
            testStr='<div class="row"><div class="col-6"><ul>'
            testStr += `<li id="typeOfPostLi"><strong>${postItem.typeOfPost}</strong></li>`;
            testStr += `<li><strong>${postItem.title}</strong></li>`;
            testStr += `<li>$ <strong>${postItem.price}</strong></li>`;
            testStr += `<li>${postItem.condition}</li>`;
            // testStr += `<li>${postItem.category}</li>`;
            testStr += '<li id="typeLi">Adress:</li>';
            testStr += `<li>${postItem.street}</li>`;
            testStr += `<li>${postItem.city}</li>`;
            testStr += `<li>${postItem.state}</li>`;
            testStr += `<li>${postItem.postCode}</li>`;
            testStr += '<li id="typeLi">Contact Info:</li>';
            // alert(postItem.contactName=="");
            testStr += `<li>${(postItem.contactName == "") ? "<font color='grey'>name: ?</font>" : postItem.contactName}</li>`;
            testStr += `<li>${(postItem.phoneNum == "") ? "<font color='grey'>Phone: ?</font>" : postItem.phoneNum}</li>`;
            testStr += `<li>${(postItem.email == "") ? "<font color='grey'>Email: ?</font>" : postItem.email}</li>`;
            testStr += `<li>${(postItem.contactMedium == "") ? "<font color='grey'>Contact Medium: ?</font>" : postItem.contactMedium}</li>`;
            testStr += `<li>${(postItem.languageOfPost == ""||postItem.languageOfPost ==null) ? "<font color='grey'>Laguage: ?</font>" : postItem.languageOfPost}</li>`;
            testStr+='</ul></div><div class="col-6">'
            testStr+=`<img class="postItemImg" src=${postItem.image}>`;
            testStr+='</div></div>'
            var btnId = postItem.id;
            var bodyId = "bodyZipcode" + postItem.id;
            var dataTarget = "#bodyZipcode" + postItem.id;
            var content = '<div class="card"><div class="card-header"><button value='+btnId+'  class="btn btn-link allPostBtn" type="button" data-toggle="collapse" data-target="' + dataTarget + '"'
                  + ' aria-expanded="fase" aria-controls="' + bodyId + '"'
                  + '> <strong>title:</strong> ' + postItem.title + ' <strong>price:</strong> ' + postItem.price + ' <strong>condition:</strong> ' + postItem.condition + ' </button></div> <div '
                  + 'id="' + bodyId + '"'
                  + ' class="collapse"> <div class="card-body">'
                  + testStr
                  + '</div></div></div>';
            // alert(content);
           
            $("#allPosts").append(content);
            // $("#searchByZipcode").append(content);
      });
      // postItemStr += "</ol>"
      // $("#postItemContainer").append(postItemStr);
}
var allPostsListShow = function (postItemsdb) {
      // alert("allPostsListShow");
      $("#allPosts").html("");
      postItemsdb.forEach(function (postItem) {
            //--------------------------
            testStr='<div class="row"><div class="col-6"><ul>'
            testStr += `<li id="typeOfPostLi"><strong>${postItem.typeOfPost}</strong></li>`;
            testStr += `<li><strong>${postItem.title}</strong></li>`;
            testStr += `<li>$ <strong>${postItem.price}</strong></li>`;
            testStr += `<li>${postItem.condition}</li>`;
            // testStr += `<li>${postItem.category}</li>`;
            testStr += '<li id="typeLi">Adress:</li>';
            testStr += `<li>${postItem.street}</li>`;
            testStr += `<li>${postItem.city}</li>`;
            testStr += `<li>${postItem.state}</li>`;
            testStr += `<li>${postItem.postCode}</li>`;
            testStr += '<li id="typeLi">Contact Info:</li>';
            // alert(postItem.contactName=="");
            testStr += `<li>${(postItem.contactName == "") ? "<font color='grey'>name: ?</font>" : postItem.contactName}</li>`;
            testStr += `<li>${(postItem.phoneNum == "") ? "<font color='grey'>Phone: ?</font>" : postItem.phoneNum}</li>`;
            testStr += `<li>${(postItem.email == "") ? "<font color='grey'>Email: ?</font>" : postItem.email}</li>`;
            testStr += `<li>${(postItem.contactMedium == "") ? "<font color='grey'>Contact Medium: ?</font>" : postItem.contactMedium}</li>`;
            testStr += `<li>${(postItem.languageOfPost == ""||postItem.languageOfPost ==null) ? "<font color='grey'>Laguage: ?</font>" : postItem.languageOfPost}</li>`;
            testStr+='</ul></div><div class="col-6">'
            testStr+=`<img class="postItemImg" src=${postItem.image}>`;
            testStr+='</div></div>'
            //----------------
            var postItemStr = "<ul>"
            // alert(JSON.stringify(postItem));
            // var postItemLi=$("<li>");
            postItemStr += `<li>${postItem.title}</li>`;
            postItemStr += `<li>${postItem.price}</li>`;
            postItemStr += `<li>${postItem.condition}</li>`;
            postItemStr += `<li>${postItem.typeOfPost}</li>`;
            postItemStr += `<li>${postItem.category}</li>`;
            postItemStr += `<img class="postItemImg" src=${postItem.image}>`;
            postItemStr += `<li>${postItem.street}</li>`;
            postItemStr += `<li>${postItem.city}</li>`;
            postItemStr += `<li>${postItem.state}</li>`;
            postItemStr += `<li>${postItem.postCode}</li>`;
            postItemStr += `<li>${postItem.contactName}</li>`;
            postItemStr += `<li>${postItem.phoneNum}</li>`;
            postItemStr += `<li>${postItem.email}</li>`;
            postItemStr += `<li>${postItem.contactMedium}</li>`;
            postItemStr += `<li>${postItem.languageOfPost}</li>`;
            postItemStr += "</ul>"
            // var addressForBtn = postItem.street + ' ' + postItem.city + ' ' + postItem.state + ' ' + postItem.postCode;
            var btnId = postItem.id;
            var bodyId = "bodyAll" + postItem.id;
            var dataTarget = "#bodyAll" + postItem.id;
            var content = '<div class="card"><div class="card-header"><button value=' + btnId + ' class="btn btn-link allPostBtn" type="button" data-toggle="collapse" data-target="' + dataTarget + '"'
                  + ' aria-expanded="fase" aria-controls="' + bodyId + '"'
                  + '> <strong>title:</strong> ' + postItem.title + ' <strong>price:</strong> ' + postItem.price + ' <strong>condition:</strong> ' + postItem.condition + ' </button></div> <div '
                  + 'id="' + bodyId + '"'
                  + ' class="collapse"> <div class="card-body">'
                  + testStr
                  + '</div></div></div>';
            // alert(content);
            $("#allPosts").append(content);
      });
      // postItemStr += "</ol>"
      // $("#postItemContainer").append(postItemStr);
}
var postsByUsedItemShow = function (postItemsdb) {
      // alert("allPostsListShow");
      // $("#alertRow").hide();
      $("#allPosts").html("");
      postItemsdb.forEach(function (postItem) {
            //--------------------------
            testStr='<div class="row"><div class="col-6"><ul>'
            testStr += `<li id="typeOfPostLi"><strong>${postItem.typeOfPost}</strong></li>`;
            testStr += `<li><strong>${postItem.title}</strong></li>`;
            testStr += `<li>$ <strong>${postItem.price}</strong></li>`;
            testStr += `<li>${postItem.condition}</li>`;
            // testStr += `<li>${postItem.category}</li>`;
            testStr += '<li id="typeLi">Adress:</li>';
            testStr += `<li>${postItem.street}</li>`;
            testStr += `<li>${postItem.city}</li>`;
            testStr += `<li>${postItem.state}</li>`;
            testStr += `<li>${postItem.postCode}</li>`;
            testStr += '<li id="typeLi">Contact Info:</li>';
            // alert(postItem.contactName=="");
            testStr += `<li>${(postItem.contactName == "") ? "<font color='grey'>name: ?</font>" : postItem.contactName}</li>`;
            testStr += `<li>${(postItem.phoneNum == "") ? "<font color='grey'>Phone: ?</font>" : postItem.phoneNum}</li>`;
            testStr += `<li>${(postItem.email == "") ? "<font color='grey'>Email: ?</font>" : postItem.email}</li>`;
            testStr += `<li>${(postItem.contactMedium == "") ? "<font color='grey'>Contact Medium: ?</font>" : postItem.contactMedium}</li>`;
            testStr += `<li>${(postItem.languageOfPost == ""||postItem.languageOfPost ==null) ? "<font color='grey'>Laguage: ?</font>" : postItem.languageOfPost}</li>`;
            testStr+='</ul></div><div class="col-6">'
            testStr+=`<img class="postItemImg" src=${postItem.image}>`;
            testStr+='</div></div>'
            // var addressForBtn = postItem.street + ' ' + postItem.city + ' ' + postItem.state + ' ' + postItem.postCode;
            var btnId = postItem.id;
            var bodyId = "bodyUsedItem" + postItem.id;
            var dataTarget = "#bodyUsedItem" + postItem.id;
            var content = '<div class="card"><div class="card-header"><button value=' + btnId + ' class="btn btn-link allPostBtn" type="button" data-toggle="collapse" data-target="' + dataTarget + '"'
                  + ' aria-expanded="fase" aria-controls="' + bodyId + '"'
                  + '> <strong>title:</strong> ' + postItem.title + ' <strong>price:</strong> ' + postItem.price + ' <strong>condition:</strong> ' + postItem.condition + ' </button></div> <div '
                  + 'id="' + bodyId + '"'
                  + ' class="collapse"> <div class="card-body">'
                  + testStr
                  + '</div></div></div>';
            // alert(content);
            $("#allPosts").append(content);
      });
      // postItemStr += "</ol>"
      // $("#postItemContainer").append(postItemStr);
}
function allPostsShow() {
      API.getPosts().then(function (allPosts) {
            allPostsListShow(allPosts);
      });
}
function locatedPostItem() {
      // alert("ok"+$(this).val());
      if ($(this).val()) {
            var id = parseInt($(this).val());
            // alert("id: " + parseInt($(this).val()));
            API.getPostById(id).then(function (dbpost) {
                  // alert(JSON.stringify(dbpost));

                  var address =dbpost.street+' '+dbpost.city+' '+dbpost.state+' '+dbpost.postCode ;
                  var geocoder = new google.maps.Geocoder();
                  // alert("address: " + address);
                  geocoder.geocode({ 'address': address }, function (results, status) {
                        // alert("results: " + JSON.stringify(results[0].geometry.location) + " status: " + status);
                        postInfoObj = {
                              id: dbpost.id,
                              lanlg: results[0].geometry.location,
                              price: dbpost.price,
                              condition: dbpost.condition,
                              image: dbpost.image,
                              title: dbpost.title,
                              address: address,
                              phoneNum: dbpost.phoneNum
                        };
                        if (status === 'OK') {
                              // alert(JSON.stringify(postInfoObj));
                              mapMarkers.forEach(function (lastmarkers) {
                                    lastmarkers.setMap(null);
                              });
                              addMarker(postInfoObj, map);
                             
                              // resultsMap.setCenter(results[0].geometry.location);
                              // var marker = new google.maps.Marker({
                              //       map: resultsMap,
                              //       position: results[0].geometry.location,
                              //       draggable: true,
                              //       title: "Confirm your location!"
                              // });
                        } else {
                              alert('Geocode was not successful for the following reason: ' + status);
                        }
                  });
            });

      } else {
            return;
      }

}