window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temp_desc = document.querySelector('.temp-desc');
    let temp_deg = document.querySelector('.temp-degree');
    let loc_timezone = document.querySelector('.location-timezone');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/c8841a65878efbd037616b0215b82e07/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                //set DOM Elements from API
                temp_deg.textContent = temperature;
                temp_desc.textContent = summary;
                loc_timezone.textContent = data.timezone;

                setIcons(icon, document.querySelector(".icon"))
            })

        });

        function setIcons(icon, iconID){
            const skycons = new Skycons({"color": "black"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

    }

});