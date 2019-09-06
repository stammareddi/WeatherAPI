window.addEventListener('load', () => {
    let long, lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
   let futuretemp = document.querySelector(".temperatureFuture");

    if (navigator.geolocation) // if this location exists in browser
    {
        navigator.geolocation.getCurrentPosition(position =>
        // gives the current location as coords
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/<Enter you api number>/${lat},${long}`
            

            fetch(api)
                .then(response => {
                    return response.json()
                    
                }) // only will run AFTER ftching the data
                .then(data => {
                   
                    console.log(data)
                    const {temperature, icon} = data.currently;

                    // Sets DOM Elements from api 

                    const futureWeather = data.daily.summary;
                    
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                   

                    setName(data.timezone);
                   futuretemp.textContent = futureWeather

                    let celsius = (temperature -32) * (5 / 9)
                        // setting icon 
                        setIcons(icon, document.querySelector(".icon"))

                    // converts F --> C
                        temperatureSection.addEventListener("click", () =>
                        {
                            if(temperatureSpan.textContent === "F"){
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(celsius)
                            } else 
                            {
                                temperatureSpan.textContent = "F"
                                temperatureDegree.textContent = Math.floor(temperature)
                            }
                        })


                });
        });

    }
    
    function setName(location)
    {
        const newLocation = location.replace(/_/g," ");
        const nLocation = newLocation.replace("/","-")
       return  locationTimezone.textContent =   nLocation
        
    }

    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase(); // replaces the api key icon (-) with (_) which is used in skycons
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});