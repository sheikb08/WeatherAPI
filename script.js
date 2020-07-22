$(document).ready(function () {

    $(".btn-outline-secondary").on("click", function () {

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
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;

                $(".city").html("<h1>" + response.city.name + "  - " + headingDate + "<img src=" + weatherPicURL + weatherPic + "@2x.png>" + "</h1>");
                $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
                $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
                $(".tempF").text("Temperature: " + tempF.toFixed(2)).append("&#8457;");

                var queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

                console.log(queryUV);

                $.ajax({
                    url: queryUV,
                    method: "GET"
                })

                    //After the data from the AJAX request comes back
                    .then(function (responseUV) {

                        $(".UV").text("UV Index: " + responseUV.value);
                        

                    });

            });


    });
});
