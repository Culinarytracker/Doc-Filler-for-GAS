function onOpen() {

var ui = DocumentApp.getUi();
var body = DocumentApp.getActiveDocument().getBody();

var responseName = ui.prompt('Tenants name?');
  var tenantName = responseName.getResponseText();
  
var responseAddress = ui.prompt('Unit Address?');
  var unitAddress = responseAddress.getResponseText();
  
var responseRentAmt = ui.prompt('Rent Amt in $?');
  var rentAmt = checkRentAmt(responseRentAmt.getResponseText());
 
var responseMoveInMonth = ui.prompt('Move In Month?');
  var moveInMonth = setMonth(responseMoveInMonth.getResponseText());
  
var responseMoveInDate = ui.prompt('Move In Date?');
  var moveInDate = setDateSuffix(responseMoveInDate.getResponseText(), moveInMonth[1]);

//replace text with appropriate entries
body.replaceText("tenantNames", tenantName );
body.replaceText("unitAddress", unitAddress );
body.replaceText("rentAmt", rentAmt );
body.replaceText("moveInMonth", moveInMonth[0]);
body.replaceText("moveInDate", moveInDate[0] + moveInDate[1]);
body.replaceText("nextMonth", calcNextMonth(moveInMonth[0])  );
body.replaceText("thirdMonth", calcNextMonth(calcNextMonth(moveInMonth[0]))  );
body.replaceText("proratedRentAmt", ((rentAmt/(moveInMonth[1]))*((moveInMonth[1])-moveInDate[0]))-((rentAmt/(moveInMonth[1]))*((moveInMonth[1])-moveInDate[0])%1) ); //replace with calculated rent per day, and discard fractions of a dollar.

}

function checkRentAmt(amt){
  var ui = DocumentApp.getUi();

  while  (isNaN(amt) || amt <= 0 || amt%1!=0){
    var tryAgain = ui.prompt(amt + ' is not a valid number. Enter the rent amount.');
        amt = tryAgain.getResponseText();
  }
  return amt;
}


function calcNextMonth(month) {
    
  if (month == "January") {return "February";}
  else if (month == "February") {return "March";}
  else if (month == "March") {return "April";}
  else if (month == "April") {return "May";}
  else if (month == "May") {return "June";}
  else if (month == "June") {return "July";}
  else if (month == "July") {return "August";}
  else if (month == "August") {return "September";}
  else if (month == "September") {return "October";}
  else if (month == "October") {return "November";}
  else if (month == "November") {return "December";}
  else if (month == "December") {return "January";}
    
  }

function setMonth(month) {                //returns [nameOfMonth, daysInMonth]
  var ui = DocumentApp.getUi();
  var monthReturn = ["month", 0];  
  var monthTest = false;
  
  while (monthTest == false){
  if (month.toUpperCase() == "JANUARY" || month.toUpperCase() == "JAN" || month == 1) {
    monthReturn[0] = "January";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else if (month.toUpperCase() == "FEBRUARY" || month.toUpperCase() == "FEB" || month == 2) {
    monthReturn[0] = "February";
    var now = new Date();                                                       //getting current date
    var year = now.getFullYear();                                               //getting just the year out of that date
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {          //testing for leap year
      monthReturn[1] = 29;                                                      //
    }
    else {monthReturn[1] = 28;}
    monthTest = true;
    }
  else if (month.toUpperCase() == "MARCH" || month.toUpperCase() == "MAR" || month == 3) {
    monthReturn[0] = "March";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else if (month.toUpperCase() == "APRIL" || month.toUpperCase() == "APR" || month == 4) {
    monthReturn[0] = "April";
    monthReturn[1] = 30;
    monthTest = true;
    }
  else if (month.toUpperCase() == "MAY" || month == 5) {
    monthReturn[0] = "May";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else if (month.toUpperCase() == "JUNE" || month.toUpperCase() == "JUN" || month == 6) {
    monthReturn[0] = "June";
    monthReturn[1] = 30;
    monthTest = true;
    }
  else if (month.toUpperCase() == "JULY" || month.toUpperCase() == "JUL" || month == 7) {
    monthReturn[0] = "July";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else if (month.toUpperCase() == "AUGUST" || month.toUpperCase() == "AUG" || month == 8) {
    monthReturn[0] = "August";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else if (month.toUpperCase() == "SEPTEMBER" || month.toUpperCase() == "SEP" || month == 9) {
    monthReturn[0] = "September";
    monthReturn[1] = 30;
    monthTest = true;
    }
  else if (month.toUpperCase() == "OCTOBER" || month.toUpperCase() == "OCT" || month == 10) {
    monthReturn[0] = "October";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else if (month.toUpperCase() == "NOVEMBER" || month.toUpperCase() == "NOV" || month == 11) {
    monthReturn[0] = "November";
    monthReturn[1] = 30;
    monthTest = true;
    }
  else if (month.toUpperCase() == "DECEMBER" || month.toUpperCase() == "DEC" || month == 12) {
    monthReturn[0] = "December";
    monthReturn[1] = 31;
    monthTest = true;
    }
  else {
    var tryAgain = ui.prompt(month + ' is not a valid month. Enter the move in month.');
    month = tryAgain.getResponseText();
    
    }
  } 
  
  return monthReturn;
}

function setDateSuffix(date, daysInMonth) {
  var ui = DocumentApp.getUi();
  
  var dateAndSuffix = [date, ""];
  var setDateTest = false;
  
  while (setDateTest == false) {
    if (isNaN(date)){
      var tryAgain = ui.prompt('Come on now, ' +date+ ' is not even a number. Enter the move in date.');
    date = tryAgain.getResponseText();
      }
  else if (date > daysInMonth || ((date%1) != 0) || date <= 0) {
    var tryAgain = ui.prompt(date + ' is not within the valid date range. Enter the move in date.');
    date = tryAgain.getResponseText();}
  else if (date == 1 || date == 21 || date == 31) {
    setDateTest = true;
    dateAndSuffix[1] = "st";}
  else if (date == 2 || date == 22) {
    setDateTest = true;
    dateAndSuffix[1] = "nd";}
  else if (date == 3 || date == 23) {
    setDateTest = true;
    dateAndSuffix[1] = "rd";}
  else if (date >= 4 && date <= daysInMonth) {
    setDateTest = true;
    dateAndSuffix[1] = "th";}
  else {var tryAgain = ui.prompt('I dunno wtf ' +date+ ' even is. Enter the move in date.');    //I don't know how else this could be messed up, but just in case this is here.
    date = tryAgain.getResponseText();}
    
    return dateAndSuffix;
    
  }
}
