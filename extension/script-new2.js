function loadKanji() {
  $.getJSON("newkanji.json", function(json) {
    //var jsonLength = Object.keys(json).length;
    var numOfKanji = document.getElementById("numOfKanji").value;
    var jsonLength = parseInt(numOfKanji)-1;
    setCookie("numOfKanji", numOfKanji, 30);
    var tries = 3;
    var kanjiIdx = Math.floor(Math.random() * (jsonLength + 1));
    document.getElementById('kanji-text').innerHTML = json[kanjiIdx]['code']

    document.getElementById("kanji-form").addEventListener("submit", function(event){
        event.preventDefault();
        var userTranslation = $("#kanji-input").val().toLowerCase().trim();
        // var validTranslations = json[kanjiIdx]['meaning'].split(',');
        var validTranslations = json[kanjiIdx]['meaning'].toLowerCase().split(', ');

        if (validTranslations.indexOf(userTranslation)==-1){
          // fail condition
          if (tries>0) {
            document.getElementById('subtitle-heading').innerHTML = "Incorrect. Try again!";
            tries--;
          }
          else {
            // document.getElementById('subtitle-heading').innerHTML = "Oops, the correct translation is: " + validTranslations.join(' or ') + "!";
            document.getElementById('subtitle-heading').innerHTML = "Oops, the correct translation is: " + validTranslations[0] + "!";
          }
          //window.close();
        } else {
          // success condition
          document.getElementById('subtitle-heading').innerHTML = "Correct!";
          setTimeout(function(){window.location.replace("http://www.google.com")}, 900);
        }

    });
  });
}

function showHideSettings(){
  var settings = document.getElementById("settings").style.display == "block";
  if (settings) {
    document.getElementById("settings").style.display = "none";
    document.getElementById("pressEsc").style.display = "block";
  }
  else {
    document.getElementById("settings").style.display = "block";
    document.getElementById("pressEsc").style.display = "none";
  }
}

function checkCookie() {
    var numOfKanji=getCookie("numOfKanji");
    if (numOfKanji != "") {
        document.getElementById("numOfKanji").value = numOfKanji;
    }
}

function setup() {
  document.getElementById('reloadButton').onclick = function () {loadKanji();};
  document.getElementById('toggleSettings').onclick = function () {showHideSettings();};
  $("#kanji-input").focus();
  checkCookie();
  loadKanji();
}

window.onload = setTimeout(setup, 10);