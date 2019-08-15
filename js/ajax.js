const serverHost = "https://jamra-api-server.herokuapp.com";
function ajaxGroupInfo(callback) {
    var groupinfo = {
        "url": serverHost+"/groupinfo",
        "method": "GET"
    }

    $.ajax(groupinfo).done(function (response) {
        callback(response);
    });
}

function ajaxToday(callback) {
    var today = {
        "url": serverHost+"/today",
        "method": "GET"
    }

    $.ajax(today).done(function (response) {
        callback(response);
    });
}

function ajaxBbsList(callback) {
    var bbs = {
        "url": serverHost+"/bbs/list",
        "method": "GET"
    }

    $.ajax(bbs).done(function (response) {
        callback(response);
    });
}