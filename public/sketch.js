


if ('geolocation' in navigator) {
    console.log("Geolocation Available");
}  else {
    console.log("Geolocation not Available")
}

function setup() {

    // noCanvas();
    const video = createCapture(VIDEO);
    video.size(320,240);

    video.loadPixels();
    const image64 = video.canvas.toDataURL();



    navigator.geolocation.getCurrentPosition(async position => {
        // console.log(position.coords);
        // console.log(position.coords.longitude);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const timestamp = new Date().toLocaleString();
        const food = document.getElementById("userInput").value;


        // document.getElementById('status').textContent = mood;
        document.getElementById("latitude").textContent = lat;
        document.getElementById("longitude").textContent = lon;
        document.getElementById("time").textContent = timestamp;
        document.getElementById("food").textContent = food;
        

        const data = { lat, lon, food, image64};
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
    
  


}



