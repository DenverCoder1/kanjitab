function loadKanji() {
  $.getJSON(characterSet, function(json) {
    changeFontFamily();
    var jsonLength = Object.keys(json).length;
    document.getElementById("kanji-input").value = "";
    if (json[0]['onyomi'] != undefined) {
      document.getElementById('title-heading').innerHTML = "read the kanji";
      document.getElementById('subtitle-heading').innerHTML = "type an On or Kun reading above and hit enter";
    }
    else if (json[0]['romanization'] != undefined) {
      document.getElementById('title-heading').innerHTML = "read the kana";
      document.getElementById('subtitle-heading').innerHTML = "type the pronunciation above and hit enter";
    }
    else {
      document.getElementById('title-heading').innerHTML = "translate the kanji";
      document.getElementById('subtitle-heading').innerHTML = "type the translation above and hit enter";
    }
    var minFrame = parseInt(document.getElementById("minFrame").value);
    var maxFrame = parseInt(document.getElementById("maxFrame").value);
    var ifCorrect = parseInt(document.getElementById("ifCorrect").value);
    var ifIncorrect = parseInt(document.getElementById("ifIncorrect").value);
    var attempts = parseInt(document.getElementById("attempts").value);
    var delay = parseInt(document.getElementById("delay").value);
    var customPage = document.getElementById("customPage").value;
    var fontFamily = $("#fontFamily").children("option").filter(":selected").text();
    var fontFamilyInput = document.getElementById("fontFamilyInput").value;
    var characterSet = document.getElementById("characterSet").value;
    if (minFrame < 1) {minFrame = 1;}
    if (maxFrame < 1) {maxFrame = 1;}
    if (minFrame > maxFrame) {minFrame = maxFrame;}
    if (minFrame > jsonLength) {minFrame = jsonLength;}
    if (maxFrame > jsonLength) {maxFrame = jsonLength;}
    document.getElementById("minFrame").value = minFrame;
    document.getElementById("maxFrame").value = maxFrame;
    setCookie("minFrame", minFrame, 180);
    setCookie("maxFrame", maxFrame, 180);
    setCookie("ifCorrect", ifCorrect, 180);
    setCookie("ifIncorrect", ifIncorrect, 180);
    setCookie("attempts", attempts, 180);
    setCookie("delay", delay, 180);
    setCookie("customPage", customPage, 180);
    setCookie("fontFamily", fontFamily, 180);
    setCookie("fontFamilyInput", fontFamilyInput, 180);
    setCookie("characterSet", characterSet, 180);
    var numOfKanji = maxFrame - minFrame;
    var kanjiIdx = Math.floor(Math.random() * (numOfKanji + 1));
    kanjiIdx += minFrame - 1;
    console.log("frame: "+(kanjiIdx+1));
    document.getElementById('kanji-text').innerHTML = json[kanjiIdx]['code']

    document.getElementById("kanji-form").addEventListener("submit", function(event){
        event.preventDefault();
        var userTranslation = $("#kanji-input").val().toLowerCase().trim();
        var validTranslations;
        if (json[0]['meaning'] != undefined) {
          validTranslations = json[kanjiIdx]['meaning'].toLowerCase().split(', ');
        }

        if (json[0]['onyomi'] != undefined) {
          validTranslations = [];
          validTranslations = validTranslations.concat(json[kanjiIdx]['onyomi'].toLowerCase().split(', '));
          validTranslations = validTranslations.concat(json[kanjiIdx]['onromaji'].toLowerCase().split(', '));
          validTranslations = validTranslations.concat(json[kanjiIdx]['onhiragana'].toLowerCase().split(', '));
          validTranslations = validTranslations.concat(json[kanjiIdx]['kunyomi'].toLowerCase().split(', '));
          validTranslations = validTranslations.concat(json[kanjiIdx]['kunromaji'].toLowerCase().split(', '));
        }

        if (json[0]['romanization'] != undefined) {
          validTranslations = json[kanjiIdx]['romanization'].toLowerCase().split(', ');
        }

        console.log(validTranslations)

        if (validTranslations.indexOf(userTranslation)==-1){
          // fail condition
          if (attempts>1) {
            document.getElementById('subtitle-heading').innerHTML = "Incorrect. Try again!";
            attempts--;
          }
          else {
            // document.getElementById('subtitle-heading').innerHTML = "oops, the correct translation is: " + validTranslations.join(' or ') + "!";
            if (ifIncorrect==1) {window.close();}
            else if (ifIncorrect==2 && json[0]['onyomi'] != undefined) {document.getElementById('subtitle-heading').innerHTML = "Incorrect. The answer is: " + validTranslations.join(' or ') + ".";}
            else if (ifIncorrect==2) {document.getElementById('subtitle-heading').innerHTML = "Incorrect. The answer is: " + validTranslations[0] + ".";}
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

function changeCharacterSet() {
  characterSet = document.getElementById("characterSet").value;
  $.getJSON(characterSet, function(json) {
    var jsonLength = Object.keys(json).length;
    document.getElementById("minFrame").value = 1;
    document.getElementById("maxFrame").value = jsonLength;
    setCookie("minFrame", minFrame, 180);
    setCookie("maxFrame", maxFrame, 180);
  });
}

function changeTheme() {
  theme = document.getElementById("theme").value;
  setCookie("theme", theme, 180);
  document.getElementsByTagName("body")[0].className = theme;
  document.getElementById("kanji-input").className = theme;
}

function showHideSettings() {
    var growDiv = document.getElementById('settings');
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      var wrapper = document.querySelector('.measuringWrapper');
      growDiv.style.height = wrapper.clientHeight + "px";
    }
document.getElementById("plusMinus").innerHTML=document.getElementById("plusMinus").innerHTML=='+'?'−':'+';
}

function validateSettings() {
  var em = "";
  var minFrame = parseInt(document.getElementById("minFrame").value);
  var maxFrame = parseInt(document.getElementById("maxFrame").value);
  var ifCorrect = parseInt(document.getElementById("ifCorrect").value);
  var attempts = parseInt(document.getElementById("attempts").value);
  var delay = parseInt(document.getElementById("delay").value);
  var customPage = document.getElementById("customPage").value;
  if (minFrame < 0) {em+="· Min frame must be greater than 0.<br/>"}
  if (maxFrame < 0) {em+="· Max frame must be greater than 0.<br/>"}
  if (maxFrame < minFrame) {em+="· Max frame must be greater than or equal to min frame.<br/>"}
  if (attempts < 0) {em+="· Attempts must be greater than or equal to 1.<br/>"}
  if (delay < 0) {em+="· Delay must be greater than or equal to 0.<br/>"}
  if (ifCorrect == 2) {
    var pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (!pattern.test(customPage)) {em+="· Custom redirect URL is invalid.<br/>"}
  }
  document.getElementById("errorMessage").innerHTML = em;
  if (em == "") {loadKanji();}
}

function checkCookie() {
    var minFrame = getCookie("minFrame") == "" ? 1 : getCookie("minFrame");
    var maxFrame = getCookie("maxFrame") == "" ? 2200 : getCookie("maxFrame");
    var ifCorrect = getCookie("ifCorrect") == "" ? 1 : getCookie("ifCorrect");
    var ifIncorrect = getCookie("ifIncorrect") == "" ? 2 : getCookie("ifIncorrect");
    var attempts = getCookie("attempts") == "" ? 1 : getCookie("attempts");
    var delay = getCookie("delay") == "" ? 400 : getCookie("delay");
    var customPage = getCookie("customPage") == "" ? "http://www.google.com" : getCookie("customPage");
    var fontFamily = getCookie("fontFamily") == "" ? "Default" : getCookie("fontFamily");
    var fontFamilyInput = getCookie("fontFamilyInput") == "" ? "" : getCookie("fontFamilyInput");
    characterSet = getCookie("characterSet") == "" ? "rtkKanji.json" : getCookie("characterSet");
    var theme = getCookie("theme") == "" ? "light" : getCookie("theme");
    document.getElementById("minFrame").value = minFrame;
    document.getElementById("maxFrame").value = maxFrame;
    document.getElementById("ifCorrect").value = ifCorrect;
    document.getElementById("ifIncorrect").value = ifIncorrect;
    document.getElementById("attempts").value = attempts;
    document.getElementById("delay").value = delay;
    document.getElementById("customPage").value = customPage;
    document.getElementById("fontFamily").value = fontFamily;
    document.getElementById("fontFamilyInput").value = fontFamilyInput;
    document.getElementById("characterSet").value = characterSet;
    document.getElementById("theme").value = theme;
    customPageDiv();
    changeFontFamily();
    changeTheme();
}

function setup() {
  document.getElementById('reloadButton').onclick = function () {validateSettings();};
  document.getElementById('toggleSettings').onclick = function () {showHideSettings();};
  document.getElementById('ifCorrect').onchange = function () {customPageDiv();};
  document.getElementById('fontFamily').onchange = function () {changeFontFamily();};
  document.getElementById('characterSet').onchange = function () {changeCharacterSet();};
  document.getElementById('theme').onchange = function () {changeTheme();};
  $("#kanji-input").focus();
  checkCookie();
  validateSettings();
}

window.onload = setTimeout(setup, 1);