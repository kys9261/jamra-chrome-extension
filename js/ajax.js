function ajaxGroupInfo(callback) {
    var groupinfo = {
        "url": "https://jamra-api-server.herokuapp.com/groupinfo",
        "method": "GET"
    }

    $.ajax(groupinfo).done(function (response) {
        callback(response);
    });
}

function ajaxToday(callback) {
    var today = {
        "url": "https://jamra-api-server.herokuapp.com/today",
        "method": "GET"
    }

    $.ajax(today).done(function (response) {
        callback(response);
    });
}

function ajaxBbsList(callback) {
    var bbs = {
        "url": "https://jamra-api-server.herokuapp.com/bbs/list",
        "method": "GET"
    }

    $.ajax(bbs).done(function (response) {
        callback(response);
    });
}