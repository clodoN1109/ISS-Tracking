const iss_data = [0, 0, 0, 0];
const iss_path = [];
let lat = 0;
let lon = 0;


function draw(latitude, longitude) {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");


    let scale_fix = 2.66;

    /*console.log(iss_path);*/

/*    for (item in iss_path) {

      lat = iss_path[item][0]/scale_fix;
      lon = iss_path[item][1]/scale_fix;
      

      ctx.fillStyle = "rgba(250, 100, 0, 1)";
      ctx.fillRect(lon, lat, 0.4, 0.4);

    }*/


      lat = latitude/scale_fix;
      lon = longitude/scale_fix;
      

      ctx.fillStyle = "rgba(250, 100, 0, 1)";
      ctx.fillRect(lon, lat, 0.4, 1);



    

  }
}



function timestampToDateConversion(timestamp){

  let epoch = Math.floor(new Date().getTime(timestamp)/1000.0); 
  var myDate = new Date( epoch *1000);
  myDate.toGMTString()+"<br>"+myDate.toLocaleString();  

  return myDate;

}

function updateWikiInfo(){

    let info1 = "The International Space Station (ISS) is the largest modular space station currently in low Earth orbit.";
    let info2 = "The first ISS component was launched in 1998, and the first long-term residents arrived on 2 November 2000 after being launched from the Baikonur Cosmodrome on 31 October 2000."
    let info3 ="The ISS programme evolved from the Space Station Freedom, a 1984 American proposal to construct a permanently crewed Earth-orbiting station,[15] and the contemporaneous Soviet/Russian Mir-2 proposal from 1976 with similar aims.";
    let info4 ="The station is divided into two sections: the Russian Orbital Segment (ROS) is operated by Russia, while the United States Orbital Segment (USOS) is run by the United States as well as by the other states.";
    let info5 = " As of April 2022, 251 astronauts, cosmonauts, and space tourists from 20 different nations have visited the space station, many of them multiple times.";
    let infoList = [info1, info2, info3, info4, info5];

    document.getElementsByClassName("wikiInfo")[0].textContent = infoList[Math.floor(Math.random() * infoList.length)];


    setTimeout(updateWikiInfo,7000);
}

function copyCoordinates(){

  let copyInfo = document.getElementById("latitude").value + ", " +
                    document.getElementById("longitude").value  + ", " +
                    document.getElementById("altitude").value + ", " +
                    document.getElementById("time").value;


  navigator.clipboard.writeText(copyInfo);

  alert("Copied the coordinates: " + copyInfo);

}

function fetchIssData(){

  fetch("https://api.wheretheiss.at/v1/satellites/25544")
  .then((response) => response.json())
  .then((iss) => {

/*    console.log(iss);*/

    iss_data[0] = iss.latitude;
    iss_data[1] = iss.longitude;
    iss_data[2] = timestampToDateConversion(Number(iss.timestamp));
    iss_data[3] = iss.altitude;

/*    console.log(iss_data[0]);
    console.log(iss_data[1]);*/
   /* console.log(iss_path);*/


    /*console.log("iss_data: ", iss_data);*/

    document.getElementById("latitude").value = iss_data[0];
    document.getElementById("longitude").value = iss_data[1];
    document.getElementById("time").value = iss_data[2];
    document.getElementById("altitude").value = iss_data[3];

    let latitude = (Number(iss_data[0]) - 90)*(-2.2222);
    let longitude = (Number(iss_data[1]) + 180)*(2.2222);
    let time = iss_data[2];

    iss_path.push([latitude,longitude]);

    draw(latitude, longitude);

    let actual_position = document.getElementsByClassName("satellite")[0].style.transform;


    document.getElementsByClassName("satellite")[0]
    .style.transform = "translate(" + longitude + "px, " + latitude +  "px)";


  setTimeout(fetchIssData,3000);



  });

}


setTimeout(updateWikiInfo,7000);
fetchIssData();

