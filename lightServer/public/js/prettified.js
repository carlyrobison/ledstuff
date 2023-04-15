// data fetching fxn --------------------------------------------------------
function addLights() {
    console.log("loading lights");
    $.getJSON('/lightarray', function(data) {
    console.log(data);
    let leds = data["lights"];
        for (let i = 0; i < leds.length; i++) {
            console.log(leds[i]);
            dv = `
            <div style="width:50px;height:50px;border:1px;
            background-color:rgb(${leds[i][0]},${leds[i][1]},${leds[i][2]})">${i}</div>
            `;
            $('#leds').append(dv);
        }
    });
      
}

$(document).ready(function() {
    console.log("ready!");
    addLights();
});