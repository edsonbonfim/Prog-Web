'use strict';

let server = 'http://localhost:1234';

let post = function(url, body, callback) {

    let http = new XMLHttpRequest();
    http.open('POST', server+url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(body);

    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            callback(http);
        }
    }
}

let get = function(url, callback) {

    let http = new XMLHttpRequest();
    http.open('GET', server+url, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            callback(http);
        }
    }
}
