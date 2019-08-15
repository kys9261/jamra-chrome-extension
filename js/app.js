const imgHost = "http://s3-ap-northeast-1.amazonaws.com/sm-tokyo/";
const week = ['일', '월', '화', '수', '목', '금', '토'];

$(document).ready(function () {
    //get bbs detail
    $(document).on("click", ".bbs-item", function () {
        var ot = $(this).attr("data-ot");
        var id = $(this).attr("data-bbsid");

        getBbsDetail(ot, id);
    });

    //attent menu
    $(document).on("click", ".menu-title", function () {
        $(this).next().collapse('toggle');
    });

    //set date format
    Date.prototype.format = function (f) {
        if (!this.valueOf()) return " ";

        var d = this;

        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return week[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
    String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
    Number.prototype.zf = function (len) { return this.toString().zf(len); };
});

ajaxGroupInfo(function(response) {
    $(".loading").remove();

    var description = response.g.ge.replace(/(\r\n|\n|\r)/gm, "<br>");
    $(".groupInfo").html(description);

    var mainSchedule = [];

    var event = {};
    event.num = 1;
    event.date = response.g.e_d;
    event.time = response.g.e_t;
    event.price = response.g.ee;
    event.location = response.g.el;
    event.title = response.g.en;
    event.max = response.g.emm;
    event.attend = 0;
    mainSchedule.push(event);

    event = {};
    event.num = 2;
    event.date = response.g.e_d2;
    event.time = response.g.e_t2;
    event.price = response.g.ee2;
    event.location = response.g.el2;
    event.title = response.g.en2;
    event.max = response.g.emm2;
    event.attend = 0;
    mainSchedule.push(event);

    event = {};
    event.num = 3;
    event.date = response.g.e_d3;
    event.time = response.g.e_t3;
    event.price = response.g.ee3;
    event.location = response.g.el3;
    event.title = response.g.en3;
    event.max = response.g.emm3;
    event.attend = 0;
    mainSchedule.push(event);

    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    for (var i = 2; i >= 0; i--) {
        if (today <= new Date(mainSchedule[i].date.toString().substring(0, 4) + '-' + mainSchedule[i].date.toString().substring(5, 6) + '-' + mainSchedule[i].date.toString().substring(6, 8))) {
            var tag = "<li><div class='schedule event"+mainSchedule[i].num+"'>" +
                "<div class='title'><h5>" + mainSchedule[i].title + "</h5></div>" +
                "<div class='date'>" +
                "<div class='dayOfWeek'>" + week[new Date(mainSchedule[i].date.toString().substring(0, 4) + '-' + mainSchedule[i].date.toString().substring(5, 6) + '-' + mainSchedule[i].date.toString().substring(6, 8)).getDay()] + "요일</div>" +
                "<div class='dateNumber'>" + (Number(mainSchedule[i].date.toString().substring(6, 8)) == today.getDate() ? '오늘' : Number(mainSchedule[i].date.toString().substring(6, 8))) + "</div>" +
                "</div>" +
                "<div class='infomation'>" +
                "<div class='datetime'><i class='far fa-clock'></i></span>" + mainSchedule[i].date.toString().substring(0, 4) + '/' + mainSchedule[i].date.toString().substring(5, 6) + '/' + mainSchedule[i].date.toString().substring(6, 8) + " " + (mainSchedule[i].time / 100 >= 12 ? '오후' : '오전') + " " + parseInt(mainSchedule[i].time / 100) + "시 " + mainSchedule[i].time % 100 + "분</div>" +
                "<div class='location'><i class='fas fa-map-marker-alt'></i>" + mainSchedule[i].location + "</div>" +
                "<div class='price'><i class='fas fa-won-sign'></i>" + mainSchedule[i].price + "</div>" +
                "</div>" +
                "</div><li>";

            tag += "<div class='attendants'>" +
                "<div class='menu-title'>" + mainSchedule[i].date.toString().substring(5, 6) + '/' + mainSchedule[i].date.toString().substring(6, 8) + "일 참석자<i class='fas fa-chevron-down'></i></div>" +
                "<div class='collapse' id='event" + i + "Attend'>" +
                "<div class='card card-body'>" +
                "<ul class='event" + mainSchedule[i].num + "-list'></ul>" +
                "</div>" +
                "</div>" +
                "</div>";

            $(".main-schedule > ul").append(tag);
        }
    }

    var memberList = response.m;
    memberList.push(response.me);

    for (var i = 0; i < memberList.length; i++) {
        if (memberList[i].ban == "N") {
            var attend = "<li><div><img src='" + imgHost + memberList[i].mid + ".png' class='profileImg'>" + memberList[i].mn + (memberList[i].key === "" ? "" : " / <font color='gray'>" + memberList[i].key + "</font>") + "</div></li>";
            if (memberList[i].ijo == "Y") {
                $(".event1-list").append(attend);
                mainSchedule[0].attend++;
            }
            if (memberList[i].ijo2 == "Y") {
                $(".event2-list").append(attend);
                mainSchedule[1].attend++;
            }
            if (memberList[i].ijo3 == "Y") {
                $(".event3-list").append(attend);
                mainSchedule[2].attend++;
            }
        }
    }
    $(".event1 .title h5").append(" ("+mainSchedule[0].attend+"/"+mainSchedule[0].max+")");
    $(".event2 .title h5").append(" ("+mainSchedule[1].attend+"/"+mainSchedule[1].max+")");
    $(".event3 .title h5").append(" ("+mainSchedule[2].attend+"/"+mainSchedule[2].max+")");
});

ajaxToday(function(response){
    if (response.ei == undefined) {
        return;
    }

    var event = {};
    event.date = response.ei.e_d;
    event.time = response.ei.e_t;
    event.price = response.ei.ee;
    event.location = response.ei.el;
    event.title = response.ei.en;
    event.max = response.ei.max;
    event.min = response.ei.min;
    event.currentMenber = response.ei.cur;

    var tag = "<li><div class='schedule'>" +
        "<div class='title'><h5><i class='fas fa-bolt'></i>" + event.title + " (" + event.currentMenber + "/" + event.max + ")</h5></div>" +
        "<div class='desc'>최소 <font>" + event.min + "</font>명 이상이면 진행합니다.</div>" +
        "<div class='date'>" +
        "<div class='dayOfWeek'>" + week[new Date(event.date.toString().substring(0, 4) + '-' + event.date.toString().substring(5, 6) + '-' + event.date.toString().substring(6, 8)).getDay()] + "요일</div>" +
        "<div class='dateNumber'>" + Number(event.date.toString().substring(6, 8)) + "</div>" +
        "</div>" +
        "<div class='infomation'>" +
        "<div class='datetime'><i class='far fa-clock'></i></span>" + event.date.toString().substring(0, 4) + '/' + event.date.toString().substring(5, 6) + '/' + event.date.toString().substring(6, 8) + " " + (event.time / 100 >= 12 ? '오후' : '오전') + " " + (parseInt(event.time / 100) >= 13 ? parseInt(event.time / 100) - 12 : parseInt(event.time / 100)) + ":" + (event.time % 100 == 0 ? '00' : event.time % 100) + "</div>" +
        "<div class='location'><i class='fas fa-map-marker-alt'></i>" + event.location + "</div>" +
        "<div class='price'><i class='fas fa-won-sign'></i>" + event.price + "</div>" +
        "</div>" +
        "</div><li>";
    $(".scheduleList").append(tag);

    tag = "<li><div><img src='" + imgHost + response.ei.hid + ".png' class='profileImg'>" + response.ei.hn + "(벙주)</div></li>"
    $("#todayAttendants ul").append(tag);

    if (response.l != null) {
        for (var i = 0; i < response.l.length; i++) {
            tag = "<li><div><img src='" + imgHost + response.l[i].mid + ".png' class='profileImg'>" + response.l[i].mn + "</div></li>"
            $("#todayAttendants ul").append(tag);
        }
    }

    $(".attendants").css("display", "block");
});

ajaxBbsList(function(response) {
    var bbsList = response.cs.splice(0, 7);
    var bbsTitleArr = [];

    for (var i = 0; i < 7; i++) {
        var date = new Date((bbsList[i].ot + 1000000000) * 1000);
        var tag = "<li>" +
            "<div class='bbs-item' data-ot='" + bbsList[i].ot + "' data-bbsid='" + bbsList[i].id + "'>" +
            (bbsList[i].w_t === 2000000000 ? "<div class='bbs-sticky'>필독</div>" : "") +
            "<div class='bbs-title'>" + bbsList[i].at + "</div>" +
            "<div class='bbs-counter'><i class='fas fa-thumbs-up'></i>" + (bbsList[i].lc == undefined ? '0' : bbsList[i].lc) + "<i class='fas fa-comment'></i>" + bbsList[i].rn + "</div>" +
            "<div class='bbs-desc'>" + bbsList[i].c + "</div>" +
            "<div class='bbs-writer'>" + bbsList[i].wn + "</div>" +
            "<div class='bbs-date'>" + date.getFullYear() + "." + date.getMonth() + "." + date.getDate() + " " + week[date.getDay()] + "요일 " + (date.getHours() >= 12 ? '오후' : '오전') + " " + (date.getHours() >= 13 ? date.getHours() - 12 : date.getHours()) + ":" + date.getMinutes() + "</div>" +
            "</div>" +
            "</li>";

        $(".bbs ul").append(tag);
        bbsTitleArr.push(bbsList[i].at);
    }
});

function getBbsDetail(ot, id) {
    var bbsDetail = {
        "url": "https://jamra-api-server.herokuapp.com/bbs/detail?ot=" + ot + "&bbsId=" + id,
        "method": "GET"
    }

    $.ajax(bbsDetail).done(function (response) {
        var detail = response.atc;
        $(".modal-title").text(detail.at);
        $(".modal-body").html(detail.c.replace(/(\r\n|\n|\r)/gm, "<br>"));
        $(".modal-writer").text(detail.wn);
        $(".modal-date").text(new Date(detail.updated).format("yyyy.MM.dd E a/p HH:mm"));

        var imgCount = detail.ic;
        for (var i = 0; i < imgCount; i++) {
            $(".modal-body").append("<br><img src='" + imgHost + detail.aid + i + ".png' class='attatchImg'>");
        }

        var comments = response.cs;
        $(".commentList ul").empty();
        for (var i = 0; i < comments.length; i++) {
            var tag = "<li>" +
                "<div class='comment'>" +
                "<img src='" + imgHost + comments[i].wid + ".png' class='profileImg' style='float: left;'>" +
                "<div class='commentInfo'>" +
                "<div class='commentCreated'>" + new Date(comments[i].updated + 'Z').format("yyyy.MM.dd E a/p HH:mm") + "</div>" +
                "<div class='commenter'>" + comments[i].wn + "</div>" +
                "<div class='commentContent'>" + comments[i].c + "</div>" +
                "</div></div>" +
                "</li>";
            $(".commentList ul").append(tag);
        }

        $('.modal').modal('show');
    });
}