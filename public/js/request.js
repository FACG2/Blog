function request (url, method, callback) {// eslint-disable-line
  var xhttp = new XMLHttpRequest();// eslint-disable-line
  xhttp.onreadystatechange = function () {
    var myJSONRemote;
    if (this.readyState === 4 && this.status === 200) {
      myJSONRemote = JSON.parse(this.responseText);
      callback(null, myJSONRemote);
    }
  };
  xhttp.open(method, url, true);
  xhttp.send();
}
