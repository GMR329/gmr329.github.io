/**
 * author: Logan Machida
 * updated by: Francisco Nguyen
 */

addStars = function (stars_num) {
    var star_elements = "";
    for (let i = 0; i < 5; i++) {
        star_elements += (i < stars_num) ? "<td><div class=\"rating user star\"></div></td>" : "<td><div class=\"rating user star blank\"></div></td>";
    }
    return star_elements;
}

addHike = function (hike) {
    return `
    <div id="hikebox", onClick='mrClicky("#ProfileHike5Name")'>
      <img id="hikepic" src="https://static.bhphotovideo.com/explora/sites/default/files/styles/top_shot/public/New-Hiking.jpg?itok=p0tfoXXi">
      <h3 id="ProfileHike5Name" class="hikeprofile">${hike.HIKE_NAME}</h3>
      <table>
          <tr>
            ${addStars(hike.RATING)}
          </tr>
      </table>
      <h4>Di. ${hike.DISTANCE} mi. El. ${hike.ELEVATION_CHANGE} ft.</h4>
    </div>
  `;
}

makeTrophy = function (trophyName, desc) {
    return `
    <div id = trophybox>
        <h3 style="margin-left: 10px; margin-right:10px"><i>${trophyName}</i> </h3>
        <h5 style="margin-left: 10px; margin-right:10px">${desc}</h5>
        <img id="trophy" src="./images/trophy.png">
    </div>`;
}

addTrophies = function (achievements_bits) {
    if (achievements_bits.charAt(0) == '1') 
        $("#achievementsbox").append(makeTrophy("Pat on the Back Badge", "Congrats! You left your couch you potato."));

    if (achievements_bits.charAt(1) == '1') 
        $("#achievementsbox").append(makeTrophy("Lurker Badge", "Hand around at the end of 5 hikes."));

    if (achievements_bits.charAt(2) == '1') 
        $("#achievementsbox").append(makeTrophy("Impossible Badge", "It's literally impossible to get this. Why are you seeing this?."));
    
    if (achievements_bits.charAt(3) == '1') 
        $("#achievementsbox").append(makeTrophy("Hermit Badge", "Survive in the woods for 7 weeks."));

    if (achievements_bits.charAt(4) == '1') 
        $("#achievementsbox").append(makeTrophy("Sprinter Badge", "Complete 60 miles in 24 hours."));
}

$(document).ready(function() { 
    $("#logoutbutton").click(function() {
        sessionStorage.clear();
        window.location.href="index.html";
   });

   $("#updatebutton").click(function(){
        window.location.href="update_profile.html";
    });
    
    var usrnm = sessionStorage.getItem('current_user');

    //making POST to get profile data
    $.post('/profile_load', {username: usrnm})
    .done(function(profile_data) {
        $("#username").text(`@${usrnm}`);
        $("#name").text(profile_data.NAME);
        $("#trails_completed").text(profile_data.TRAILS_COMPLETED);
        $("#distance_walked").text(profile_data.DISTANCE_WALKED);
        $("#elevation_gain").text(profile_data.ELEVATION_GAINED);

        addTrophies(profile_data.ACHIEVEMENTS);
    });

    //making POST to get profile's list of completed hikes
    $.post('/profile_hike_list', {username: usrnm})
        .done(function(data) {
            for (let hike of data) {
                $("#completedbox").append(addHike(hike));
            }
        });
  });

function mrClicky(hikeNameField){
  passName = $(hikeNameField).text();
  localStorage.setItem('Name', passName);
  window.location.href="hike_page_template.html";
}