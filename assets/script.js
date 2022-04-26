var apiKey = "api_key=bvwxSwdXvedrbinKUD2prCFEEp7cfHVv8HGToRPi"
var website = "https://developer.nps.gov/api/v1/parks?parkCode=acad&"



var parkSearch = function() {
    var testFetch = website + apiKey;
    fetch(testFetch)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error: City not Found");
            }
        }) 
        .catch(function(error) {
            alert("Unable to connect to weather service");
        });
};

$('#search-button').on("click", parkSearch)