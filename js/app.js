$( document ).ready(function() {
    $(document).on("click", ".bbs-item", function(){
        var ot = $(this).attr("data-ot");
        var id = $(this).attr("data-bbsid");

        getBbsDetail(ot, id);
    });

    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
     
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = this;
         
        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
});

const week = ['일', '월', '화', '수', '목', '금', '토'];

var groupinfo = {
    "url": "https://jamra-api-server.herokuapp.com/groupinfo",
    "method": "GET"
}

$.ajax(groupinfo).done(function (response) {
    var description = response.g.ge.replace(/(\r\n|\n|\r)/gm, "<br>");
    $(".groupInfo").html(description);

    var mainSchedule = [];

    var event = {};
    event.date = response.g.e_d;
    event.time = response.g.e_t;
    event.price = response.g.ee;
    event.location = response.g.el;
    event.title = response.g.en;
    mainSchedule.push(event);

    event = {};
    event.date = response.g.e_d2;
    event.time = response.g.e_t2;
    event.price = response.g.ee2;
    event.location = response.g.el2;
    event.title = response.g.en2;
    mainSchedule.push(event);

    event = {};
    event.date = response.g.e_d3;
    event.time = response.g.e_t3;
    event.price = response.g.ee3;
    event.location = response.g.el3;
    event.title = response.g.en3;
    mainSchedule.push(event);

    for (var i = 2; i >= 0; i--) {
        if (new Date < new Date(mainSchedule[i].date.toString().substring(0, 4) + '-' + mainSchedule[i].date.toString().substring(5, 6) + '-' + mainSchedule[i].date.toString().substring(6, 8))) {
            var tag = "<li><div class='schedule'>" +
                "<div class='title'><h4>" + mainSchedule[i].title + "</h4></div>" +
                "<div class='date'>" +
                "<div class='dayOfWeek'>" + week[new Date(mainSchedule[i].date.toString().substring(0, 4) + '-' + mainSchedule[i].date.toString().substring(5, 6) + '-' + mainSchedule[i].date.toString().substring(6, 8)).getDay()] + "요일</div>" +
                "<div class='dateNumber'>" + Number(mainSchedule[i].date.toString().substring(6, 8)) + "</div>" +
                "</div>" +
                "<div class='infomation'>" +
                "<div class='datetime'><i class='far fa-clock'></i></span>" + mainSchedule[i].date.toString().substring(0, 4) + '/' + mainSchedule[i].date.toString().substring(5, 6) + '/' + mainSchedule[i].date.toString().substring(6, 8) + " " + (mainSchedule[i].time / 100 >= 12 ? '오후' : '오전') + " " + parseInt(mainSchedule[i].time / 100) + "시 " + mainSchedule[i].time % 100 + "분</div>" +
                "<div class='location'><i class='fas fa-map-marker-alt'></i>" + mainSchedule[i].location + "</div>" +
                "<div class='price'><i class='fas fa-won-sign'></i>" + mainSchedule[i].price + "</div>" +
                "</div>" +
                "</div><li>";

            $(".main-schedule ul").append(tag);
        }
    }
});

var today = {
    "url": "https://jamra-api-server.herokuapp.com/today",
    "method": "GET"
}

$.ajax(today).done(function (response) {

    if(response.ei == undefined) { 
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
        "<div class='title'><h4><i class='fas fa-bolt'></i>" + event.title + "(" + event.currentMenber + "/" + event.max + ")</h4></div>" +
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

    $(".today-schedule ul").append(tag);
});

var bbs = {
    "url": "https://jamra-api-server.herokuapp.com/bbs/list",
    "method": "GET"
}

$.ajax(bbs).done(function (response) {
    var bbsList = response.cs.splice(0,7);
    
    for(var i =0; i < 7; i++) {
        var date = new Date((bbsList[i].ot + 1000000000) * 1000);

        var tag = "<li>"+
                    "<div class='bbs-item' data-ot='"+bbsList[i].ot+"' data-bbsid='"+bbsList[i].id+"'>"+
                        (bbsList[i].w_t === 2000000000 ? "<div class='bbs-sticky'>필독</div>" : "")+
                        "<div class='bbs-title'>"+bbsList[i].at+"</div>"+
                        "<div class='bbs-desc'>"+bbsList[i].c+"</div>"+
                        "<div class='bbs-writer'>"+bbsList[i].wn+"</div>"+
                        "<div class='bbs-date'>"+date.getFullYear()+"."+date.getMonth()+"."+date.getDate()+" "+week[date.getDay()]+"요일 "+(date.getHours() >= 12 ? '오후' : '오전') + " " + (date.getHours() >= 13 ? date.getHours() - 12 : date.getHours()) + ":" + date.getMinutes()+"</div>"+
                    "</div>"+
                "</li>";
        
        $(".bbs ul").append(tag);
    }
});


function getBbsDetail(ot, id) {
    var bbsDetail = {
        "url": "https://jamra-api-server.herokuapp.com/bbs/detail?ot="+ot+"&bbsId="+id,
        "method": "GET"
    }

    $.ajax(bbsDetail).done(function (response) {
        console.log(response);
        var detail = response.atc;
        $(".modal-title").text(detail.at);
        $(".modal-body").html(detail.c.replace(/(\r\n|\n|\r)/gm, "<br>"));
        $(".modal-writer").text(detail.wn);
        $(".modal-date").text(new Date(detail.updated).format("yyyy.MM.dd E a/p HH:mm"));
        $('.modal').modal('show');
    });
}