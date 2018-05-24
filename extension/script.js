function loadKanji() {
  $.getJSON("rtkkanji.json", function(json) {
    changeFontFamily();
    var jsonLength = Object.keys(json).length;
    document.getElementById("kanji-input").value = "";
    document.getElementById('subtitle-heading').innerHTML = "type the translation above and hit enter";
    var minFrame = document.getElementById("minFrame").value;
    var maxFrame = document.getElementById("maxFrame").value;
    var ifCorrect = document.getElementById("ifCorrect").value;
    var ifIncorrect = document.getElementById("ifIncorrect").value;
    var attempts = document.getElementById("attempts").value;
    var delay = document.getElementById("delay").value;
    var customPage = document.getElementById("customPage").value;
    var fontFamily = $("#fontFamily").children("option").filter(":selected").text();
    var fontFamilyInput = document.getElementById("fontFamilyInput").value;
    if (minFrame < 1) {minFrame = 1;}
    if (maxFrame > jsonLength) {maxFrame = jsonLength;}
    setCookie("minFrame", minFrame, 180);
    setCookie("maxFrame", maxFrame, 180);
    setCookie("ifCorrect", ifCorrect, 180);
    setCookie("ifIncorrect", ifIncorrect, 180);
    setCookie("attempts", attempts, 180);
    setCookie("delay", delay, 180);
    setCookie("customPage", customPage, 180);
    setCookie("fontFamily", fontFamily, 180);
    setCookie("fontFamilyInput", fontFamilyInput, 180);
    var numOfKanji = maxFrame - minFrame;
    var kanjiIdx = Math.floor(Math.random() * (numOfKanji + 1));
    kanjiIdx += minFrame - 1;
    console.log("frame: "+(kanjiIdx+1));
    document.getElementById('kanji-text').innerHTML = json[kanjiIdx]['code']

    document.getElementById("kanji-form").addEventListener("submit", function(event){
        event.preventDefault();
        var userTranslation = $("#kanji-input").val().toLowerCase().trim();
        var validTranslations = json[kanjiIdx]['meaning'].toLowerCase().split(', ');

        if (validTranslations.indexOf(userTranslation)==-1){
          // fail condition
          if (attempts>1) {
            document.getElementById('subtitle-heading').innerHTML = "Incorrect. Try again!";
            attempts--;
          }
          else {
            // document.getElementById('subtitle-heading').innerHTML = "oops, the correct translation is: " + validTranslations.join(' or ') + "!";
            if (ifIncorrect==1) {window.close();}
            else if (ifIncorrect==2) {document.getElementById('subtitle-heading').innerHTML = "Incorrect. The correct translation is: " + validTranslations[0] + ".";}
          }
        } else {
          // success condition
          document.getElementById('subtitle-heading').innerHTML = "Correct!";
          if (ifCorrect==1) {setTimeout(function(){window.location.replace("http://www.google.com")}, delay);}
          if (ifCorrect==2) {setTimeout(function(){window.location.replace(customPage)}, delay);}
          if (ifCorrect==3) {setTimeout(function(){loadKanji();}, delay);}
        }

    });
  });
}

function showHideSettings(){
  var settings = document.getElementById("settings").style.display == "block";
  if (settings) {
    document.getElementById("settings").style.display = "none";
    document.getElementById("toggleSettings").innerHTML = "click here for settings";
  }
  else {
    document.getElementById("settings").style.display = "block";
    document.getElementById("toggleSettings").innerHTML = "click to hide settings";
  }
}

function customPageDiv() {
  if(document.getElementById("ifCorrect").value==2) {
    document.getElementById("customPageDiv").style.display="inline-block"
  }
  else {
    document.getElementById("customPageDiv").style.display="none"
  }
}

function changeFontFamily(){
  var fontFamily = $("#fontFamily").children("option").filter(":selected").text();
  if (fontFamily == "Custom") {
    document.getElementById("fontFamilyInputDiv").style.display="inline-block"
  }
  else if (fontFamily == "Default") {
    document.getElementById("fontFamilyInputDiv").style.display="none"
    document.getElementById("fontFamilyInput").value = "";
  }
  else {
    document.getElementById("fontFamilyInputDiv").style.display="none"
    document.getElementById("fontFamilyInput").value = fontFamily;
  }
  document.getElementById("kanji-text").style.fontFamily = document.getElementById("fontFamilyInput").value;
}

function checkCookie() {
    var minFrame = getCookie("minFrame") == "" ? 1 : getCookie("minFrame");
    var maxFrame = getCookie("maxFrame") == "" ? 2200 : getCookie("maxFrame");
    var ifCorrect = getCookie("ifCorrect") == "" ? 1 : getCookie("ifCorrect");
    var ifIncorrect = getCookie("ifIncorrect") == "" ? 2 : getCookie("ifIncorrect");
    var attempts = getCookie("attempts") == "" ? 1 : getCookie("attempts");
    var delay = getCookie("delay") == "" ? 700 : getCookie("delay");
    var customPage = getCookie("customPage") == "" ? "http://www.google.com" : getCookie("customPage");
    var fontFamily = getCookie("fontFamily") == "" ? "Default" : getCookie("fontFamily");
    var fontFamilyInput = getCookie("fontFamilyInput") == "" ? "" : getCookie("fontFamilyInput");
    document.getElementById("minFrame").value = minFrame;
    document.getElementById("maxFrame").value = maxFrame;
    document.getElementById("ifCorrect").value = ifCorrect;
    document.getElementById("ifIncorrect").value = ifIncorrect;
    document.getElementById("attempts").value = attempts;
    document.getElementById("delay").value = delay;
    document.getElementById("customPage").value = customPage;
    document.getElementById("fontFamily").value = fontFamily;
    document.getElementById("fontFamilyInput").value = fontFamilyInput;
    customPageDiv();
    changeFontFamily();
}

function setup() {
  document.getElementById('reloadButton').onclick = function () {loadKanji();};
  document.getElementById('toggleSettings').onclick = function () {showHideSettings();};
  document.getElementById('ifCorrect').onchange = function () {customPageDiv();};
  document.getElementById('fontFamily').onchange = function () {changeFontFamily();};
  $("#kanji-input").focus();
  checkCookie();
  loadKanji();
}

window.onload = setTimeout(setup, 1);