'use strict';

let server = 'http://localhost:3000';

let post = (url, body, callback) => {

    let http = new XMLHttpRequest();
    http.open('POST', server+url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(body);

    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            callback(http.status, http.response);
        }
    }
}

let get = (url, callback) => {

    let http = new XMLHttpRequest();
    http.open('GET', server+url, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            callback(http.status, http.response);
        }
    }
}
