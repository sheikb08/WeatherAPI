
$(document).ready(function () {

    //The double pipes is useful for first time users. Anything in local storage will be stored in array. If nothing is in local storage the array will return empty.
    var historyArray = window.localStorage.getItem("history");

    if (historyArray !== null) {

        var myHistory = JSON.parse(historyArray);
        console.log(historyArray);
        console.log(typeof myHistory);
        myHistory.forEach(city => { $(".btn-group-vertical").append(`<button class='btn'>${city}</button>`) });
    }
    // else {
    //     var historyArray = [];
    // }


    $(".btn").on("click", function () {

        var headingDate = moment().format('LL');
        var cityName = $(".form-control").val();
        var APIKey = "872a249ad3fc1a7d6c0cf1a3d219af74";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;




        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data from the AJAX request comes back
            .then(function (response) {

                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);

                var weatherPic = response.list[1].weather[0].icon;
                var weatherPicURL = "http://openweathermap.org/img/wn/";
                var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
                var tempF1 = (response.list[2].main.temp - 273.15) * 1.80 + 32;
                var tempF2 = (response.list[10].main.temp - 273.15) * 1.80 + 32;
                var tempF3 = (response.list[18].main.temp - 273.15) * 1.80 + 32;
                var tempF4 = (response.list[26].main.temp - 273.15) * 1.80 + 32;
                var tempF5 = (response.list[34].main.temp - 273.15) * 1.80 + 32;
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;
                var cSearch = response.city.name;


                var cityDisplay = $(".city").html("<h1>" + response.city.name + "  - " + headingDate + "<img src=" + weatherPicURL + weatherPic + "@2x.png>" + "</h1>");
                var windSpeed = $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
                var humidity = $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
                var temp = $(".tempF").text("Temperature: " + tempF.toFixed(2)).append("&#8457;");






                var queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

                console.log(queryUV);

                $.ajax({
                    url: queryUV,
                    method: "GET"
                })

                    //After the data from the AJAX request comes back
                    .then(function (responseUV) {

                        var UVIndex = responseUV.value;

                        if (UVIndex < 6) {
                            $(".UV").text("UV Index: " + UVIndex).addClass("favor");
                        }
                        else if (UVIndex > 5 && UVIndex < 8) {
                            $(".UV").text("UV Index: " + UVIndex).addClass("moderate");
                        } else if (UVIndex > 9) {
                            $(".UV").text("UV Index: " + UVIndex).addClass("severe");
                        }

                        console.log(queryUV);
                        console.log(responseUV);

                    });

                // This feature stores button into local storage. Maybe add a forloop for cList and cSearch?

                if (myHistory !== undefined) {
                var cList = [...myHistory, cSearch];
                window.localStorage.setItem("history", JSON.stringify(cList));
                $(".btn-group-vertical").append(`<button class='btn'>${cSearch}</button>`);

            }else{
                var cList = [cSearch];
                window.localStorage.setItem("history", JSON.stringify(cList));
                $(".btn-group-vertical").append(`<button class='btn'>${cSearch}</button>`);
            }




                //5-Day Forecast

                var Day5Head = $("#Day5").html("<h2> 5-Day Forecast </h2> <br/>");

                var MomentForecast1 = moment().add(1, 'days').format('L');
                var forecast1 = $(".forecast1").html(MomentForecast1 + "</br>" + "<img src=" + weatherPicURL + response.list[2].weather[0].icon + "@2x.png>" + "</br>" + "Temperature: " + tempF1.toFixed(2) + "</br>" + "Humidity: " + response.list[2].main.humidity + "%");

                var MomentForecast2 = moment().add(2, 'days').format('L');
                var forecast2 = $(".forecast2").html(MomentForecast2 + "</br>" + "<img src=" + weatherPicURL + response.list[10].weather[0].icon + "@2x.png>" + "</br>" + "Temperature: " + tempF2.toFixed(2) + "</br>" + "Humidity: " + response.list[10].main.humidity + "%");

                var MomentForecast3 = moment().add(3, 'days').format('L');
                var forecastPic3 = $(".forecast3").html(MomentForecast3 + "</br>" + "<img src=" + weatherPicURL + response.list[18].weather[0].icon + "@2x.png>" + "</br>" + "Temperature: " + tempF3.toFixed(2) + "</br>" + "Humidity: " + response.list[18].main.humidity + "%");


                var MomentForecast4 = moment().add(4, 'days').format('L');
                var forecastPic4 = $(".forecast4").html(MomentForecast4 + "</br>" + "<img src=" + weatherPicURL + response.list[26].weather[0].icon + "@2x.png>" + "</br>" + "Temperature: " + tempF4.toFixed(2) + "</br>" + "Humidity: " + response.list[26].main.humidity + "%");


                var MomentForecast5 = moment().add(5, 'days').format('L');
                var forecastPic5 = $(".forecast5").html(MomentForecast5 + "</br>" + "<img src=" + weatherPicURL + response.list[34].weather[0].icon + "@2x.png>" + "</br>" + "Temperature: " + tempF5.toFixed(2) + "</br>" + "Humidity: " + response.list[34].main.humidity + "%");


                // i=1, output=2
                //i=2, output=10
                //i=3, output=18
                //i=4, output=26
                //i=5, output=34
                //Add this formula to all lines start forloop at 1. (i-1)*8+2


            });


    });

    $(document).on("click", ".btn", function (event) {


        var inputCity = $(this).attr("data-category");
        var newsType = $(this).text().trim();



    });
});

