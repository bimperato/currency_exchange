const select = document.querySelectorAll("select"); // select both of the <select> from html
const input = document.querySelectorAll("input"); // select both of the <input> from html
const apiUrl = "https://api.exchangeratesapi.io/latest"; // api link
let html = "";
var today = new Date(); // date object
var date = today.getMonth(); // gets month 0-11
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); // military time
var newDate = getDate(date) + " " + today.getDate(); // setting newDate equal to the result of getDate and adding the day 0-31

function getDate(date) {
  var day;
  switch (date) {
    case 0:
      day = "Jan";
      break;
    case 1:
      day = "Feb";
      break;
    case 2:
      day = "March";
      break;
    case 3:
      day = "April";
      break;
    case 4:
      day = "May";
      break;
    case 5:
      day = "June";
      break;
    case 6:
      day = "July";
      break;
    case 7:
      day = "Aug";
      break;
    case 8:
      day = "Sept";
      break;
    case 9:
      day = "Oct";
      break;
    case 10:
      day = "Nov";
      break;
    case 11:
      day = "Dec";
      break;
  }
  return day;
}

var myTIme = milToStandard(time);
function milToStandard(value) {
  if (value.length == 8) {
    // expected length for military time
    var hour = value.substring(0, 2); // extract hour
    var minutes = value.substring(3, 5); // extract minutes
    var ident = "AM"; // initalize AM PM identifer
    if (hour == 12) {
      //If hour is 12 then should set identifier to PM
      ident = "PM";
    }
    if (hour == 0) {
      //If hour is 0 then set to 12 for standard time 12 AM
      hour = 12;
      ident = "AM";
    }
    if (hour > 12) {
      // If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
      hour = hour - 12;
      ident = "PM";
    }
    return hour + ":" + minutes + " " + ident;
  } else {
    return value;
  }
}

var totalTime = newDate + ", " + myTIme;
document.getElementById("time").innerHTML = totalTime;

async function currency() {
  // need to use async in order to use await
  const res = await fetch(apiUrl); // wait until done before going to next line
  // when calling the fetch API, the browser sends a request to that url
  // then, the URL API will read that request, run some code, and send back a response
  const data = await res.json(); // wait until done before going to next line
  // json converst it to human readable format
  const arrKeys = Object.keys(data.rates);
  // the object.keys method returns an array of strings with the objects property names
  const rates = data.rates; // all of the rates based on EURO

  //map takes a callback function as an argument, and the idea is that it will apply that callback function to every element in your array. And not only that, but map will also subsequently push each result into a brand new array for you!
  arrKeys.map((item) => {
    html += `<option value="${item}">${item}</option>`;
  });

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html; // putting the new options from above inside the select html
  }
  function converter(i, k) {
    input[i].value =
      (input[k].value * rates[select[i].value]) / rates[select[k].value];
    // ex: passed in 1,0
    // the second input box  = the first input box's value * the second select's rate / the first select's rate

    // if you change the first select to AUD and second select to CZK
    // 1 in AUD so
    // 1 * 27 / 1.66
    // based on EURO!!
  }

  input[0].addEventListener("keyup", function () {
    converter(1, 0);
  });

  // this listens and waits for a key to be released on the first input box, then it calls the converter
  // function with the values 1,0.
  // now, lets go up to the converter function

  input[1].addEventListener("keyup", () => converter(0, 1));
}
currency();
