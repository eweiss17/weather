jQuery(document).ready(function($) {
    function geoLookUp() {
        $.ajax({
            url: "https://api.wunderground.com/api/a11346804b94d5dd/geolookup/q/autoip.json",
            dataType: "jsonp",
            success: function(parsed_json) {
                var state = parsed_json['location']['state'];
                var city = parsed_json['location']['city'];
                var country = parsed_json['location']['country'];
                if (country === 'US') {
                    $("#city").html("You are located in the state of " + state + " and the city of " + city + ".");
                    weatherLookUp(state, city);
                } else {
                    $("#city").html("You are located in the country of " + country + " and the city of " + city + ".");
                    weatherLookUp(country, city);
                }
            }
        });
    }

    function weatherLookUp(region, city) {
        $.ajax({
            url: "https://api.wunderground.com/api/a11346804b94d5dd/geolookup/conditions/q/" + region + "/" + city + ".json",
            dataType: "jsonp",
            success: function(parsed_json) {
                var temp_f = parsed_json['current_observation']['temp_f'];
                var temp_c = parsed_json['current_observation']['temp_c'];
                var weather = parsed_json['current_observation']['weather'];
                //Icons
                var skycons = new Skycons();

                function iconSet(val) {
                    switch (val) {
                        case 'Clear':
                            skycons.add("icon1", Skycons.CLEAR_DAY);
                            break;
                        case "Partly Cloudy":
                            skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
                            break;
                        case 'Mostly Cloudy':
                            skycons.add("icon1", Skycons.CLOUDY);
                            break;
                        case 'Rain':
                            skycons.add("icon1", Skycons.RAIN);
                            break;
                        case 'Light Rain':
                            skycons.add("icon1", Skycons.RAIN);
                            break;
                        case 'Light Thunderstorms and Rain':
                            skycons.add("icon1", Skycons.RAIN);
                            break;
                        case 'Sleet':
                            skycons.add("icon1", Skycons.SLEET);
                            break;
                        case 'Snow':
                            skycons.add("icon1", Skycons.SNOW);
                            break;
                        case 'Windy':
                            skycons.add("icon1", Skycons.WIND);
                            break;
                        case 'Overcast':
                            skycons.add("icon1", Skycons.CLOUDY);
                            break;
                        case 'Heavy Rain':
                            skycons.add("icon1", Skycons.RAIN);
                            break;
                    }
                }
                iconSet(weather);
                skycons.play();
                //Temperature
                $("#weather").html("In the city of " + city + " the weather is " + weather + ".");
                $("#temp").html("The temperature in Fahrenheit is " + temp_f + "&deg;.");
                $("#switcher").on("click", function() {
                    if ($("#temp").hasClass("temp_f")) {
                        $("#temp").html("The temperature in Celsius is " + temp_c + "&deg;.");
                        $("#temp").removeClass("temp_f")
                        $("#temp").addClass("temp_c")
                        $("#switcher").html("Switch Back?");
                    } else {
                        $("#temp").html("The temperature in Fahrenheit is " + temp_f + "&deg;.");
                        $("#temp").removeClass("temp_c")
                        $("#temp").addClass("temp_f")
                        $("#switcher").html("Switch to Celsius?");
                    }
                });
            }
        });
    }
    geoLookUp();
});