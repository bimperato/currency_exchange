const select = document.querySelectorAll("select"); 
const input = document.querySelectorAll("input"); 
const apiUrl = "https://api.exchangeratesapi.io/latest"; 
let html = "";
var today = new Date(); 
var date = today.getMonth(); 
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
var newDate = getDate(date) + " " + today.getDate(); 

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
  
    var hour = value.substring(0, 2); 
    var minutes = value.substring(3, 5);
    var ident = "AM"; 
    if (hour == 12) {
      ident = "PM";
    }
    if (hour == 0) {
      hour = 12;
      ident = "AM";
    }
    if (hour > 12) {
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

  const res = await fetch(apiUrl); 
  const data = await res.json(); 
  const arrKeys = Object.keys(data.rates);
  
  const rates = data.rates; 


  arrKeys.map((item) => {
    html += `<option value="${item}">${item}</option>`;
  });

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html; 
  }
  function converter(i, k) {
    input[i].value =
      (input[k].value * rates[select[i].value]) / rates[select[k].value];
   
  }

  input[0].addEventListener("keyup", function () {
    converter(1, 0);
  });


  input[1].addEventListener("keyup", () => converter(0, 1));
}
currency();
