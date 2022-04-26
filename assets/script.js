var apiKey = "api_key=bvwxSwdXvedrbinKUD2prCFEEp7cfHVv8HGToRPi"
var website = "https://developer.nps.gov/api/v1/parks?parkCode=acad&"

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