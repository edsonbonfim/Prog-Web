'use strict';

var server = 'http://0.0.0.0:1234';

var post = function(url, body, callback) {

    var http = new XMLHttpRequest();
    http.open('POST', server+url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(body);

    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            callback(http.status, http.response);
        }
    }
}

var get = function(url, callback) {

    var http = new XMLHttpRequest();
    http.open('GET', server+url, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            callback(http.status, http.response);
        }
    }
}
