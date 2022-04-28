var apiKey = "&api_key=bvwxSwdXvedrbinKUD2prCFEEp7cfHVv8HGToRPi"
var website = "https://developer.nps.gov/api/v1/parks?stateCode="
var limit = "&limit=10"


// var formSubmitHandler = function(event) {
//     event.preventDefault();

//     var enteredPark = parkCode;
//     console.log(enteredPark);
    
//     if (enteredPark) {
//         parkSearch(enteredPark);
//     } else {
//         alert("Please enter a National Park Code.");
//     }
// }

var parkSearch = function () {
  var stateCode = document.getElementById("state-code").value;
  console.log(stateCode);
  var searchedStateCode = website + stateCode + limit + apiKey;
  fetch(searchedStateCode, {
    method: "GET",
    headers: { accept: "application/json" },
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

    });
};

var createParkCards = function(parks){
  var cardContainer = document.getElementById("parks-card-container");

  for(var i = 0; i < parks.length; i++){
    var parkCard = document.createElement("article");
    parkCard.setAttribute("data-cardId", i);
    
    var parkCardHead = document.createElement("header");
    parkCardHead.textContent(data[i].fullName);
    parkCard.appendChild(parkCardHead);

    var parkCardBody = document.createElement("body");
    
    var parkDescription = document.createElement("span");
    parkDescription.textContent(data[i].description);

    var parkWeatherInfo = document.createElement("span");
    parkWeatherInfo.textContent(data[i].weatherInfo);

    parkCardBody.appendChild(parkDescription);
    parkCardBody.appendChild(parkWeatherInfo);
    parkCard.appendChild(parkCardBody);

    cardContainer.appendChild(parkCard);
  }
}

$('#actual-search').on("click", parkSearch);

/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2022 - Licensed under MIT
 */

// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms
let visibleModal = null;


// Toggle modal
const toggleModal = event => {
  event.preventDefault();
  const modal = document.getElementById(event.target.getAttribute('data-target'));
  (typeof(modal) != 'undefined' && modal != null)
    && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

// Is modal open
const isModalOpen = modal => {
  return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

// Open modal
const openModal = modal => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute('open', true);
}

// Close modal
const closeModal = modal => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty('--scrollbar-width');
    modal.removeAttribute('open');
  }, animationDuration);
}

// Close with a click outside
document.addEventListener('click', event => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector('article');
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
}



//y value
var latitude = 38.72261844;

//x value
var longitude = -109.5863666;

//calculate lat long x1, x2, y1, y2
function calculateMapXY(lat, long){
    //latitude y
    var earth = 6378.137,  //radius of the earth in kilometer
        pi = Math.PI,
        m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

    //add and subtract 5000 meters
    var y1 = lat + (5000 * m);
    var y2 = lat - (5000 * m);

    console.log(y1);
    console.log(y2);

    //longitude x
    var earth = 6378.137,  //radius of the earth in kilometer
        pi = Math.PI,
        cos = Math.cos,
        m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

    var x1 = long - (5000 * m) / cos(lat * (pi / 180));
    var x2 = long + (5000 * m) / cos(lat * (pi / 180));

    console.log(y1 + ", " + x1);
    console.log(y2 + ", " + x2);

    return [x1, x2, y1, y2];
}

calculateMapXY(latitude, longitude);
