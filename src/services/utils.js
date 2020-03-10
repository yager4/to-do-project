export default {
    getRandomID,
    getFormattedDate,
    getFormattedTime
}

function getRandomID() {
    let letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
    let id = '';
    for (let i = 0; i < 10; i++) {
        let ind = Math.floor(Math.random() * letters.length)
        id += letters[ind];
    }
    return id;
}

function getFormattedDate(){
    let date = new Date().toLocaleDateString("en-US");
    return date;
}

function getFormattedTime(){
  var date = new Date();  
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}



