const mapURL = "http://www.mapquestapi.com/directions/v2/route?key=0wnsX6Fhy9MZtGfWxi4Jddc6oDwDnWcY&from="
const spotifyArtistURL = "https://api.spotify.com/v1/search"
var totalTime = 0;

// start up app - look for submit event, read both addresses, call the distance calculator API, load next screen
function appStarter() {
    $("form").submit(event => {
        event.preventDefault();
        let startString = $('.start-address-input').map(function() {
            if ($(this).val() !== "") {
            return $(this).val().replace(/\s/g,"+");
        }})
        .get()
        .join("+");
        let endString = $('.address-input').map(function() {
            if ($(this).val() !== "") {
            return $(this).val().replace(/\s/g,"+");
        }})
        .get()
        .join("+");
        calculateDistance(startString, endString);
        });
    }

function calculateDistance (address1, address2) {
    let searchURL = mapURL + address1 + `&to=` + address2;
    fetch(searchURL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
   })
   .then(responseJson => renderTime(responseJson))
   .catch(err => {
    $('.errorMessage').text(`Something broke down: ${err.message}`);
}); 
}

function renderTime(object) {
 var totalTime = object.route.realTime;
 console.log(totalTime);
 hours = Math.floor(totalTime / 3600);
 minutes = Math.round((totalTime % 3600) / 60);
 $('.hourAmount').text(hours);
 $('.minuteAmount').text(minutes);
}


$(appStarter);