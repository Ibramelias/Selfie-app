
function setup() {

    noCanvas()
    const video = createCapture(VIDEO);
    video.size(320, 240);
    let lat, lon;

    const button = document.getElementById('button')

    button.addEventListener("click", async event => {

        const timestamp = new Date().toLocaleString();
        const food = document.getElementById("userInput").value;

        video.loadPixels();
        const image64 = video.canvas.toDataURL()

        document.getElementById("time").textContent = timestamp;
        document.getElementById("food").textContent = food;

        const data = { lat, lon, food, image64 };
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

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log("Geolocation Available");
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon);
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;
        })

    } else {
        console.log("Geolocation not Available")
    }

   

}


