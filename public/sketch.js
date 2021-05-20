


function setup() {

    var canvas = document.getElementById('canvas');

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160,120);

    const image64 = canvas.toDataURL();
    // video.loadpixels();

    const mood = document.getElementById("userInput").value;
    const day = document.getElementById('userDay').value;

    if ('geolocation' in navigator) {
        console.log("Geolocation Available");
        navigator.geolocation.getCurrentPosition(async position => {
            // console.log(position.coords);
            // console.log(position.coords.longitude);
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const timestamp = Date.now();


            document.getElementById('status').textContent = mood;
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;
            document.getElementById("time").textContent = timestamp;

            const data = { lat, lon, mood, day, image64 };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify(data),
            };
            const response = await fetch('/api', options)
            const json = await response.json();
            console.log(json)

        })
    } else {
        console.log("Geolocation not Available")
    }
    
}


